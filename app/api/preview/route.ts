import { createPreviewHandler } from '@bifrost-orbit-cms/sdk/next'
import { cms } from '@/lib/cms'

export const GET = createPreviewHandler({ client: cms })
