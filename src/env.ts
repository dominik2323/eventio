import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-arktype'
import { z } from 'zod'

export const env = createEnv({
  server: {
    EVENTIO_API_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    EVENTIO_API_KEY: process.env.EVENTIO_API_KEY,
  },
  extends: [vercel()],
})
