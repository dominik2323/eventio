import { env } from '@/env'

export async function eventioClient<T>(
  path: string,
  body: unknown
): Promise<{ data: T; ok: boolean; res: Response }> {
  const res = await fetch(`${env.EVENTIO_API_URL}${path}`, {
    method: 'POST',
    headers: {
      apikey: env.EVENTIO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return { data: await res.json(), ok: res.ok, res }
}
