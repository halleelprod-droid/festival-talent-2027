// Serveur LOCAL et PRIVÉ de revue des inscriptions. N'écoute que sur 127.0.0.1,
// refuse la production, ne sert aucune ressource distante, ne journalise aucune
// donnée personnelle. Ne fait AUCUN import, AUCUN SMS, AUCUN appel Twilio.
//
//   PRESELECTION_REVIEW_FILE=... npm run preselections:review-ui
//   PRESELECTION_REVIEW_FILE=... npm run preselections:review-ui:check
//
// Voir docs/PRESELECTION_REVIEW_UI.md.

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { randomBytes } from "node:crypto";
import {
  copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, unlinkSync, writeFileSync,
} from "node:fs";
import { basename, dirname, join } from "node:path";

import {
  EDITABLE_FIELDS, IMPORT_READY_COLUMNS, REVIEW_UI_HOST, REVIEW_UI_PORT, SECURITY_HEADERS,
  applyEdits, backupFileName, buildCsp, buildContactMessage, buildImportReadyRows,
  computeDashboard, computeVersion, hasVersionConflict, isAllowedHost, isPathWithin,
  isProductionEnv, parseReviewContent, planBackupDeletions, previewResponses, serializeReviewContent,
} from "@/src/import/preselection-review-server";
import { validateHumanReviewRows } from "@/src/import/preselection-review";
import { normalizeSenegalPhone } from "@/src/services/messaging/phone";
import { createHash } from "node:crypto";

const TOKEN = randomBytes(24).toString("hex");

function log(message: string) {
  // Jamais de donnée personnelle : uniquement des messages techniques statiques.
  process.stdout.write(`[review-ui] ${message}\n`);
}

function fail(message: string): never {
  process.stderr.write(`[review-ui] ${message}\n`);
  process.exit(1);
}

function resolveConfig() {
  if (isProductionEnv()) fail("refused: production environment (NODE_ENV=production / Vercel)");
  const reviewFile = (process.env.PRESELECTION_REVIEW_FILE ?? "").trim();
  if (!reviewFile) fail("missing PRESELECTION_REVIEW_FILE");
  if (!existsSync(reviewFile)) fail("review file not found");
  const allowedDir = dirname(reviewFile);
  const backupsDir = join(allowedDir, "review-backups");
  // Source (export complet) pour reconstruire les colonnes import-ready (ex. city).
  let sourceFile = (process.env.PRESELECTION_SOURCE_FILE ?? "").trim();
  if (!sourceFile) {
    const candidate = readdirSync(allowedDir)
      .filter((f) => /^supabase-preselections-full-.*\.csv$/.test(f))
      .sort()
      .pop();
    if (candidate) sourceFile = join(allowedDir, candidate);
  }
  if (sourceFile && !isPathWithin(sourceFile, allowedDir)) sourceFile = "";
  return { reviewFile, allowedDir, backupsDir, sourceFile };
}

const CONFIG = resolveConfig();

// --- Accès fichier (confiné au dossier autorisé) ------------------------------

function readReview() {
  const content = readFileSync(CONFIG.reviewFile, "utf8");
  const { columns, rows } = parseReviewContent(content);
  return { content, columns, rows, version: computeVersion(content) };
}

// Sérialisation des écritures (mutex en mémoire, mono-processus local).
let writeChain: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => T): Promise<T> {
  const run = writeChain.then(fn, fn);
  writeChain = run.catch(() => undefined);
  return run;
}

function saveReview(expectedVersion: string | undefined, edits: Record<string, Record<string, string>>) {
  return withLock(() => {
    const current = readReview();
    if (hasVersionConflict(expectedVersion, current.version)) {
      return { conflict: true as const, version: current.version };
    }
    const result = applyEdits(current.rows, edits);
    const nextContent = serializeReviewContent(current.columns, result.rows);

    // Vérifie que le CSV temporaire se relit correctement avant remplacement.
    const check = parseReviewContent(nextContent);
    if (check.rows.length !== current.rows.length) throw new Error("row_count_changed");

    // Sauvegarde horodatée + rotation (max 20).
    mkdirSync(CONFIG.backupsDir, { recursive: true });
    const backupName = backupFileName(basename(CONFIG.reviewFile).replace(/\.csv$/, ""), new Date());
    copyFileSync(CONFIG.reviewFile, join(CONFIG.backupsDir, backupName));
    const existing = readdirSync(CONFIG.backupsDir).filter((f) => f.endsWith(".csv"));
    for (const stale of planBackupDeletions(existing, 20)) {
      try { unlinkSync(join(CONFIG.backupsDir, stale)); } catch { /* ignore */ }
    }

    // Écriture atomique : fichier temporaire puis renommage (remplace l'existant).
    const tmp = `${CONFIG.reviewFile}.tmp-${randomBytes(6).toString("hex")}`;
    writeFileSync(tmp, nextContent, "utf8");
    renameSync(tmp, CONFIG.reviewFile);

    const saved = readReview();
    return {
      conflict: false as const,
      version: saved.version,
      applied: result.applied,
      unknownIds: result.unknownIds.length,
      dashboard: computeDashboard(saved.rows),
    };
  });
}

// --- Import-ready ------------------------------------------------------------

function computeUnresolved(rows: ReturnType<typeof readReview>["rows"]) {
  const { results } = validateHumanReviewRows(rows);
  return results.filter((r) => !r.ready && r.decision !== "rejected" && r.decision !== "hold").length;
}

function generateImportReady() {
  return withLock(() => {
    const current = readReview();
    const dashboard = computeDashboard(current.rows);
    const unresolved = computeUnresolved(current.rows);
    const gateOpen = unresolved === 0 && dashboard.dobRemaining === 0
      && dashboard.phoneUnresolved === 0 && dashboard.duplicatePending === 0 && dashboard.ready > 0;
    if (!gateOpen) return { emitted: false as const, reason: "not_all_resolved", unresolved, dashboard };
    if (!CONFIG.sourceFile || !existsSync(CONFIG.sourceFile)) {
      return { emitted: false as const, reason: "source_file_missing", unresolved, dashboard };
    }

    const { results } = validateHumanReviewRows(current.rows);
    const readyIds = new Set(results.filter((r) => r.ready).map((r) => r.sourceId));
    const source = parseReviewContent(readFileSync(CONFIG.sourceFile, "utf8"));
    const rows = buildImportReadyRows(current.rows, source.rows, readyIds);
    if (!rows.length) return { emitted: false as const, reason: "no_rows", unresolved, dashboard };

    const p = (n: number) => String(n).padStart(2, "0");
    const now = new Date();
    const date = `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
    const outPath = join(CONFIG.allowedDir, `preselections-import-ready-${date}.csv`);
    const escape = (c: string) => `"${String(c ?? "").replaceAll('"', '""')}"`;
    const csv = `﻿${IMPORT_READY_COLUMNS.map(escape).join(",")}\r\n${rows.map((r) => r.map(escape).join(",")).join("\r\n")}\r\n`;
    writeFileSync(outPath, csv, "utf8");
    const sha256 = createHash("sha256").update(readFileSync(outPath)).digest("hex");
    writeFileSync(
      join(CONFIG.allowedDir, `preselections-import-ready-${date}.summary.json`),
      `${JSON.stringify({ generated_at: now.toISOString(), rows: rows.length, columns: IMPORT_READY_COLUMNS.length, sha256 }, null, 2)}\n`,
      "utf8",
    );
    return { emitted: true as const, file: basename(outPath), rows: rows.length, sha256, dashboard };
  });
}

// --- HTTP helpers ------------------------------------------------------------

function applyHeaders(res: ServerResponse, nonce: string, type: string) {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);
  res.setHeader("Content-Security-Policy", buildCsp(nonce));
  res.setHeader("Content-Type", type);
}

function sendJson(res: ServerResponse, status: number, body: unknown, nonce: string) {
  applyHeaders(res, nonce, "application/json; charset=utf-8");
  res.statusCode = status;
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > 8 * 1024 * 1024) throw new Error("payload_too_large");
    chunks.push(chunk as Buffer);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function tokenOk(req: IncomingMessage): boolean {
  return req.headers["x-review-token"] === TOKEN;
}

function serveHtml(res: ServerResponse, nonce: string) {
  const templatePath = join(process.cwd(), "review-ui", "index.html");
  let html = readFileSync(templatePath, "utf8");
  html = html.replaceAll("__NONCE__", nonce).replace("__TOKEN__", TOKEN);
  applyHeaders(res, nonce, "text/html; charset=utf-8");
  res.statusCode = 200;
  res.end(html);
}

const server = createServer(async (req, res) => {
  const nonce = randomBytes(16).toString("base64");
  const method = req.method ?? "GET";
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  const path = url.pathname;

  // Garde réseau : Host doit être localhost/127.0.0.1 ; Origin externe refusé.
  if (!isAllowedHost(req.headers.host)) { res.statusCode = 403; res.end("forbidden_host"); log(`403 ${method} ${path}`); return; }
  const origin = req.headers.origin;
  if (origin && !isAllowedHost(origin.replace(/^https?:\/\//, ""))) {
    res.statusCode = 403; res.end("forbidden_origin"); log(`403 ${method} ${path}`); return;
  }
  if (method !== "GET" && method !== "POST") { sendJson(res, 405, { error: "method_not_allowed" }, nonce); return; }

  try {
    if (method === "GET" && path === "/") { serveHtml(res, nonce); log("200 GET /"); return; }
    if (method === "GET" && path === "/favicon.ico") { res.statusCode = 204; res.end(); return; }

    if (method === "GET" && path === "/api/data") {
      const { rows, columns, version } = readReview();
      sendJson(res, 200, {
        columns, rows, version, dashboard: computeDashboard(rows),
        sourceAvailable: Boolean(CONFIG.sourceFile && existsSync(CONFIG.sourceFile)),
        constants: { editableFields: EDITABLE_FIELDS },
      }, nonce);
      log(`200 GET /api/data (${rows.length})`);
      return;
    }

    if (method === "POST" && path === "/api/validate") {
      if (!tokenOk(req)) { sendJson(res, 401, { error: "unauthorized" }, nonce); return; }
      const { rows } = readReview();
      const { counters } = validateHumanReviewRows(rows);
      const unresolved = computeUnresolved(rows);
      sendJson(res, 200, { counters, unresolved }, nonce);
      log("200 POST /api/validate");
      return;
    }

    if (method === "POST" && path === "/api/save") {
      if (!tokenOk(req)) { sendJson(res, 401, { error: "unauthorized" }, nonce); return; }
      const body = (await readBody(req)) as { version?: string; edits?: Record<string, Record<string, string>> };
      const result = await saveReview(body.version, body.edits ?? {});
      if ("conflict" in result && result.conflict) { sendJson(res, 409, { error: "version_conflict", version: result.version }, nonce); log("409 POST /api/save"); return; }
      sendJson(res, 200, { ok: true, ...result }, nonce);
      log("200 POST /api/save");
      return;
    }

    if (method === "POST" && path === "/api/apply-responses") {
      if (!tokenOk(req)) { sendJson(res, 401, { error: "unauthorized" }, nonce); return; }
      const body = (await readBody(req)) as { rows?: Record<string, string>[]; confirm?: boolean };
      const { rows: reviewRows } = readReview();
      const knownIds = new Set(reviewRows.map((r) => (r.review_id ?? "").trim()));
      const preview = previewResponses(body.rows ?? [], knownIds, (v) => normalizeSenegalPhone(v).valid);
      if (!body.confirm) { sendJson(res, 200, { preview: { applicableCount: preview.applicableCount, unknownIds: preview.unknownIds, invalidDob: preview.invalidDob, invalidPhone: preview.invalidPhone } }, nonce); return; }
      const current = readReview();
      const saved = await saveReview(current.version, preview.applicable);
      sendJson(res, 200, { applied: preview.applicableCount, unknownIds: preview.unknownIds, result: saved }, nonce);
      log("200 POST /api/apply-responses");
      return;
    }

    if (method === "POST" && path === "/api/import-ready") {
      if (!tokenOk(req)) { sendJson(res, 401, { error: "unauthorized" }, nonce); return; }
      const result = await generateImportReady();
      sendJson(res, result.emitted ? 200 : 409, result, nonce);
      log(`${result.emitted ? 200 : 409} POST /api/import-ready`);
      return;
    }

    if (method === "POST" && path === "/api/contact-message") {
      if (!tokenOk(req)) { sendJson(res, 401, { error: "unauthorized" }, nonce); return; }
      const body = (await readBody(req)) as { fullName?: string };
      // Rendu local uniquement ; jamais journalisé, jamais envoyé.
      sendJson(res, 200, { message: buildContactMessage(body.fullName ?? "") }, nonce);
      return;
    }

    sendJson(res, 404, { error: "not_found" }, nonce);
  } catch (error) {
    // Message générique : jamais de chemin privé ni de donnée.
    const code = error instanceof Error && error.message === "payload_too_large" ? 413 : 500;
    sendJson(res, code, { error: code === 413 ? "payload_too_large" : "server_error" }, nonce);
    log(`${code} ${method} ${path}`);
  }
});

// --- Démarrage ---------------------------------------------------------------

function startupSummary() {
  const { rows } = readReview();
  const dashboard = computeDashboard(rows);
  return { total: dashboard.total, file: basename(CONFIG.reviewFile), dashboard };
}

if (process.argv.includes("--check")) {
  const summary = startupSummary();
  // Compteurs uniquement — aucune donnée personnelle, aucun secret.
  log(`check ok — file=${summary.file} total=${summary.total}`);
  process.stdout.write(`${JSON.stringify(summary.dashboard, null, 2)}\n`);
  process.exit(0);
}

server.listen(REVIEW_UI_PORT, REVIEW_UI_HOST, () => {
  const summary = startupSummary();
  log(`listening on http://${REVIEW_UI_HOST}:${REVIEW_UI_PORT}`);
  log(`file=${summary.file} total=${summary.total}`);
  log("private local tool — do not deploy, do not expose, no SMS, no import");
});
