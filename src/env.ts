import { createEnv } from '@t3-oss/env-nextjs'
// import { vercel } from '@t3-oss/env-nextjs/presets-arktype'
import { z } from 'zod'

export const env = createEnv({
  server: {
    EVENTIO_API_KEY: z.string().min(1),
    EVENTIO_API_URL: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    EVENTIO_API_KEY: process.env.EVENTIO_API_KEY,
    EVENTIO_API_URL: process.env.EVENTIO_API_URL,
  },
  // extends: [vercel()],
})
