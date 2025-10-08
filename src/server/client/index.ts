import { env } from '@/env'
import { getAccessToken, storeAccessToken } from '@/lib/session'
import { auth } from '@/server/auth'

export async function eventioClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T; ok: boolean; res: Response }> {
  const res = await fetch(`${env.EVENTIO_API_URL}${path}`, {
    method: 'POST',
    ...options,
    headers: {
      apikey: env.EVENTIO_API_KEY,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  return { data: await res.json(), ok: res.ok, res }
}

export async function eventioAuthClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T; ok: boolean; res: Response }> {
  const accessToken = await getAccessToken()

  const makeRequest = async (token?: string) => {
    const headers: Record<string, string> = {
      apikey: env.EVENTIO_API_KEY,
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return fetch(`${env.EVENTIO_API_URL}${path}`, {
      method: 'POST',
      ...options,
      headers,
    })
  }

  let res = await makeRequest(accessToken)

  if (res.status === 401 && accessToken) {
    try {
      const refreshResult = await auth.getAccessToken()
      if (refreshResult.accessToken) {
        await storeAccessToken(refreshResult.accessToken)
        res = await makeRequest(refreshResult.accessToken)
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
    }
  }

  const data = await res.json()

  return { data, ok: res.ok, res }
}
