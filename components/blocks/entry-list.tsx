import { CmsImage, type BlockProps } from '@bifrost-orbit-cms/sdk/react'

import { Icon } from '@/components/ui/icon'
import { SectionHead } from '@/components/ui/section-head'
import { SmartLink } from '@/components/ui/smart-link'
import type { EntryCard } from '@/lib/enrich'
import { formatDate } from '@/lib/values'

import styles from './blocks.module.css'

export function EntryList({ block }: BlockProps<'entryList'>) {
  const entries = (block as { entries?: EntryCard[] | null }).entries ?? []
  if (!entries.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        {block.heading ? <SectionHead heading={block.heading} /> : null}
        {block.layout === 'list' ? (
          <ul className={styles.entryList}>
            {entries.map((item) => (
              <li key={item.id}>
                <EntryRow item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className={`${styles.grid} ${styles.columns3}`}>
            {entries.map((item) => (
              <li key={item.id}>
                <EntryTile item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function Meta({ item }: { item: EntryCard }) {
  const date = formatDate(item.date)
  const parts = [item.label, date].filter(Boolean)
  if (!parts.length) return null
  return <p className={styles.meta}>{parts.join(' · ')}</p>
}

function EntryTile({ item }: { item: EntryCard }) {
  return (
    <article className={styles.card}>
      {item.image ? (
        <div className={`frame ${styles.cardImage}`}>
          <CmsImage image={item.image} sizes="(min-width: 960px) 400px, (min-width: 640px) 50vw, 100vw" />
        </div>
      ) : item.icon ? (
        <span className={styles.iconBadge}>
          <Icon name={item.icon} size={22} />
        </span>
      ) : null}
      <div className={styles.cardBody}>
        <Meta item={item} />
        <h3>
          <SmartLink href={item.url ?? '/'} className={styles.stretched}>
            {item.name}
          </SmartLink>
        </h3>
        {item.excerpt ? <p className={styles.excerpt}>{item.excerpt}</p> : null}
      </div>
    </article>
  )
}

function EntryRow({ item }: { item: EntryCard }) {
  return (
    <article className={styles.entryRow}>
      <div className={styles.entryRowText}>
        <Meta item={item} />
        <h3>
          <SmartLink href={item.url ?? '/'} className={styles.stretched}>
            {item.name}
          </SmartLink>
        </h3>
        {item.excerpt ? <p className={styles.excerpt}>{item.excerpt}</p> : null}
      </div>
      {item.image ? (
        <div className={`frame ${styles.entryRowImage}`}>
          <CmsImage image={item.image} sizes="240px" alt="" />
        </div>
      ) : item.icon ? (
        <span className={styles.iconBadge}>
          <Icon name={item.icon} size={22} />
        </span>
      ) : null}
    </article>
  )
}
