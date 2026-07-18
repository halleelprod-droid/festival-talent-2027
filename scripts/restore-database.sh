#!/usr/bin/env bash
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL is required}"
backup_file="${1:-}"
confirmation="${2:-}"

if [[ -z "$backup_file" || ! -f "$backup_file" ]]; then
  echo "Usage: restore-database.sh <backup.dump> --confirm-restore" >&2
  exit 1
fi
if [[ "$confirmation" != "--confirm-restore" ]]; then
  echo "Restoration requires --confirm-restore." >&2
  exit 1
fi

pg_restore --dbname="$DATABASE_URL" --clean --if-exists --no-owner "$backup_file"
echo "Restore completed from: $backup_file"
