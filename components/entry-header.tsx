import type { CmsPage } from '@bifrost-orbit-cms/sdk'
import { CmsImage, RichText } from '@bifrost-orbit-cms/sdk/react'

import { Icon } from '@/components/ui/icon'
import { SmartLink } from '@/components/ui/smart-link'
import { entry, formatDate, image, images, lines, number, text } from '@/lib/values'

import styles from './entry.module.css'

const FACTS = [
  ['duration', 'Duration'],
  ['price', 'Price'],
  ['bestTime', 'Best time to go'],
  ['address', 'Address'],
  ['openingHours', 'Opening hours'],
  ['phone', 'Phone'],
  ['email', 'Email'],
] as const

function Fact({ name, value }: { name: (typeof FACTS)[number][0]; value: string[] }) {
  if (name === 'phone') return <a href={`tel:${value[0]!.replace(/[^\d+]/g, '')}`}>{value[0]}</a>
  if (name === 'email') return <a href={`mailto:${value[0]}`}>{value[0]}</a>
  return value.map((line) => (
    <span key={line} className={styles.line}>
      {line}
    </span>
  ))
}

export function EntryHeader({ page }: { page: CmsPage }) {
  const fields = page.fields
  const group = entry(fields.category) ?? entry(fields.topic)
  const author = entry(fields.author)
  const authorPhoto = image(author?.fields.photo)
  const cover = image(fields.image)
  const portrait = cover ? null : image(fields.photo)
  const lead = text(fields.excerpt) ?? text(fields.summary)
  const label = [text(fields.role), text(fields.team), text(fields.season)].filter(Boolean).join(' · ')
  const dated = text(fields.publishedOn) ?? (fields.author !== undefined || fields.excerpt !== undefined ? page.publishedAt : null)
  const date = formatDate(dated)
  const updated = formatDate(text(fields.updatedOn))
  const minutes = number(fields.readingTime)
  const icon = text(fields.icon)
  const facts = FACTS.map(([key, name]) => [key, name, lines(fields[key])] as const).filter(([, , value]) => value.length > 0)
  const pictures = images(fields.images)
  const meta = Boolean(author || date || updated || minutes)

  return (
    <header className={styles.header}>
      <div className="narrow">
        {portrait ? (
          <div className={`frame ${styles.portrait}`}>
            <CmsImage image={portrait} sizes="160px" priority />
          </div>
        ) : icon ? (
          <span className={styles.icon}>
            <Icon name={icon} size={28} />
          </span>
        ) : null}
        {group ? group.url ? <SmartLink href={group.url} className="eyebrow">{group.name}</SmartLink> : <p className="eyebrow">{group.name}</p> : null}
        <h1 className={styles.title}>{page.name}</h1>
        {label ? <p className={styles.label}>{label}</p> : null}
        {lead ? <p className={`lead ${styles.lead}`}>{lead}</p> : null}
        {meta ? (
          <div className={styles.meta}>
            {author ? (
              <span className={styles.author}>
                {authorPhoto ? (
                  <span className={`frame ${styles.avatar}`}>
                    <CmsImage image={authorPhoto} sizes="40px" alt="" />
                  </span>
                ) : null}
                <span>
                  By {author.url ? <SmartLink href={author.url}>{author.name}</SmartLink> : author.name}
                </span>
              </span>
            ) : null}
            {date ? <time dateTime={dated ?? undefined}>{date}</time> : null}
            {updated ? <span>Updated {updated}</span> : null}
            {minutes ? <span>{minutes} min read</span> : null}
          </div>
        ) : null}
        {facts.length ? (
          <dl className={styles.facts}>
            {facts.map(([key, name, value]) => (
              <div key={key}>
                <dt>{name}</dt>
                <dd>
                  <Fact name={key} value={value} />
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      {cover ? (
        <figure className={`container ${styles.cover}`}>
          <div className={`frame ${styles.coverFrame}`}>
            <CmsImage image={cover} sizes="(min-width: 1216px) 1216px, 100vw" priority />
          </div>
        </figure>
      ) : null}
      <RichText value={text(fields.bio) ?? text(fields.intro)} className={`narrow prose ${styles.bio}`} />
      {pictures.length ? (
        <ul className={`container ${styles.pictures}`}>
          {pictures.map((picture) => (
            <li key={picture.id}>
              <CmsImage image={picture} sizes="(min-width: 960px) 400px, (min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  )
}

export function EntryFooter({ page }: { page: CmsPage }) {
  const related = (Array.isArray(page.fields.related) ? page.fields.related : []).map(entry).filter((item) => item?.url)
  if (!related.length) return null
  return (
    <aside className={`narrow ${styles.related}`} aria-labelledby="related">
      <h2 id="related" className={styles.relatedHeading}>
        Related
      </h2>
      <ul>
        {related.map((item) => (
          <li key={item!.id}>
            <SmartLink href={item!.url!}>{item!.name}</SmartLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
