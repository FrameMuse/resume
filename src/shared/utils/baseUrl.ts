function normalizeBase(baseUrl: string) {
  if (baseUrl === "/") return "/"
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
}

export function withBaseUrl(path = "") {
  const baseUrl = normalizeBase(import.meta.env.BASE_URL || "/")
  const normalizedPath = path.replace(/^\/+/, "")
  return normalizedPath ? `${baseUrl}${normalizedPath}` : baseUrl
}

export function stripBaseUrl(pathname: string) {
  const baseUrl = normalizeBase(import.meta.env.BASE_URL || "/")
  if (baseUrl === "/") return pathname

  const baseWithoutTrailingSlash = baseUrl.replace(/\/$/, "")
  if (pathname === baseWithoutTrailingSlash) return "/"
  if (pathname.startsWith(baseWithoutTrailingSlash + "/")) {
    return pathname.slice(baseWithoutTrailingSlash.length)
  }

  return pathname
}