import { createRevalidateHandler } from '@bifrost-orbit-cms/sdk/next'

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.CMS_WEBHOOK_SECRET
  if (!secret) return Response.json({ error: { code: 'not_configured' } }, { status: 503 })
  return createRevalidateHandler({ secret })(request)
}
