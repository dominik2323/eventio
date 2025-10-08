import { eventio } from '@/server'

export async function GET() {
  try {
    const res = await eventio.events.getEvents()
    return Response.json(res)
  } catch (e) {
    console.error(e)
    return Response.error()
  }
}
