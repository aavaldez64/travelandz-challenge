export function parseQueryParams(props: Record<string, any>): string {
  const queryParams: string[] = [];
  Object.entries(props).forEach(([key, value]) => {
    queryParams.push(`${key}=${value}`);
  });

  if (queryParams.length === 0) return "";

  return `?${queryParams.join("&")}`;
}
