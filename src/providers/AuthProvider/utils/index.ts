const makeRequest = async (
  path: string,
  accessToken?: string,
  options: RequestInit = {}
) => {
  const headers: HeadersInit = {
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  }

  const res = await fetch(path, {
    ...options,
    headers,
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  return res.json()
}

export const authUtils = {
  makeRequest,
}
