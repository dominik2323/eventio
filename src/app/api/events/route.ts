import { eventioClient } from '@/server/client'

export async function GET() {
  const res = await eventioClient('/events', {
    method: 'GET',
  })
  return Response.json({ data: res.data })
}
