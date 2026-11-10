import 'server-only'
import { createCmsClient } from '@bifrost-orbit-cms/sdk'

export const cms = createCmsClient({
  baseUrl: process.env.CMS_API_URL!,
  apiKey: process.env.CMS_PUBLIC_KEY!,
  previewKey: process.env.CMS_PREVIEW_KEY || undefined,
  defaultRegion: process.env.CMS_DEFAULT_REGION,
  cache: { revalidate: 60, tags: true },
})
