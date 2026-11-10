'use client'

import type { CmsPage as CmsPageData } from '@bifrost-orbit-cms/sdk'
import { useLivePage } from '@bifrost-orbit-cms/sdk/react'
import { useRouter } from 'next/navigation'

import type { EntryLists } from '@/lib/enrich'

import { PageContent } from './page-content'

export function LivePage({ page, lists }: { page: CmsPageData; lists: EntryLists }) {
  const router = useRouter()
  const live = useLivePage(page, { onSaved: () => router.refresh() })
  return <PageContent page={live} lists={lists} />
}
