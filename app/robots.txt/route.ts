import { createRobotsRoute } from '@bifrost-orbit-cms/sdk/next'

import { cms } from '@/lib/cms'

export const GET = createRobotsRoute(cms)

export const dynamic = 'force-dynamic'
