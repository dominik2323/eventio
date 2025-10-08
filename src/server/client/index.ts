import { env } from '@/env'

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
