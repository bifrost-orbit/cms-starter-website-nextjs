import { createSitemapRoute } from '@bifrost-orbit-cms/sdk/next'

import { cms } from '@/lib/cms'

export const GET = createSitemapRoute(cms)

export const dynamic = 'force-dynamic'
