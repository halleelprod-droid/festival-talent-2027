export type PlatformApiMeta = {
  resource: string;
  version: "v1";
  sensitivity: "public" | "protected" | "private";
  generatedAt: string;
  note?: string;
};

export function createPlatformResponse<T>(
  resource: string,
  data: T,
  options: {
    sensitivity?: PlatformApiMeta["sensitivity"];
    note?: string;
  } = {}
) {
  return Response.json({
    meta: {
      resource,
      version: "v1",
      sensitivity: options.sensitivity ?? "public",
      generatedAt: new Date().toISOString(),
      note: options.note,
    } satisfies PlatformApiMeta,
    data,
  });
}
