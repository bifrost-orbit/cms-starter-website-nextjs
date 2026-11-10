import type { CmsPage as CmsPageData } from '@bifrost-orbit-cms/sdk'

import { loadLists } from '@/lib/prepare'

import { LivePage } from './live-page'
import { PageContent } from './page-content'

export async function PageBody({ page }: { page: CmsPageData }) {
  const lists = await loadLists(page.components, { locale: page.locale, preview: page.draft })
  if (page.draft) return <LivePage page={page} lists={lists} />
  return <PageContent page={page} lists={lists} />
}
