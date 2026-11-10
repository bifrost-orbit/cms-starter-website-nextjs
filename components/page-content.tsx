import type { CmsPage as CmsPageData } from '@bifrost-orbit-cms/sdk'
import { CmsPage } from '@bifrost-orbit-cms/sdk/react'

import { registry } from '@/cms/registry'
import { enrich, type EntryLists } from '@/lib/enrich'

import { EntryFooter, EntryHeader } from './entry-header'
import styles from './entry.module.css'

const PAGE_TYPES = new Set(['page', 'landingPage'])

export function PageContent({ page, lists }: { page: CmsPageData; lists: EntryLists }) {
  const shown = { ...page, components: enrich(page.components, lists) }
  if (!PAGE_TYPES.has(page.contentType)) {
    return (
      <article className={styles.article}>
        <EntryHeader page={page} />
        <div className={styles.body}>
          <CmsPage page={shown} registry={registry} />
          <EntryFooter page={page} />
        </div>
      </article>
    )
  }
  const titled = page.components.some((node) => node.type === 'hero' || (node.type === 'heading' && node.fields.level === 'h1'))
  return (
    <>
      {titled ? null : <h1 className="sr-only">{page.name}</h1>}
      {page.expired ? (
        <p className={styles.notice} role="status">
          {page.expired.message}
        </p>
      ) : null}
      <CmsPage page={shown} registry={registry} />
    </>
  )
}
