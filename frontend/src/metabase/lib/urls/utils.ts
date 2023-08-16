export function appendSlug(path: string | number, slug?: string) {
  return String(path);
  // Steedos Analytics
  // return slug ? `${path}-${slug}` : String(path);
}

export function extractEntityId(slug = "") {
  return slug ? slug : undefined;
  // Steedos Analytics
  // const id = parseInt(slug, 10);
  // return Number.isSafeInteger(id) ? id : undefined;
}

function flattenParam([key, value]: [string, unknown]) {
  if (value instanceof Array) {
    return value.map(p => [key, p]);
  }
  return [[key, value]];
}

export function extractQueryParams(query: Record<string, unknown>) {
  return Object.entries(query).map(flattenParam).flat();
}
