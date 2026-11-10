import { CmsImage, RichText, type BlockProps } from '@bifrost-orbit-cms/sdk/react'

import { Icon } from '@/components/ui/icon'
import { SmartLink } from '@/components/ui/smart-link'
import { linkHref, text } from '@/lib/values'

import styles from './blocks.module.css'

export function Heading({ block }: BlockProps<'heading'>) {
  const Tag = block.level === 'h1' || block.level === 'h3' ? block.level : 'h2'
  return (
    <div data-cms-id={block.id} className="band flow">
      <div className="narrow">
        <Tag>{block.text}</Tag>
      </div>
    </div>
  )
}

export function RichTextBlock({ block }: BlockProps<'richtext'>) {
  return (
    <div data-cms-id={block.id} className="band flow">
      <RichText value={block.body} className="narrow prose" />
    </div>
  )
}

export function ImageBlock({ block }: BlockProps<'image'>) {
  if (!block.asset) return null
  const caption = text(block.caption)
  return (
    <figure data-cms-id={block.id} className="band flow">
      <div className={`container ${styles.figure}`}>
        <CmsImage image={block.asset} alt={text(block.alt) ?? undefined} sizes="(min-width: 1216px) 1216px, 100vw" className={styles.figureImage} />
        {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
      </div>
    </figure>
  )
}

export function Button({ block }: BlockProps<'button'>) {
  const href = linkHref(block.link)
  if (!href) return null
  return (
    <SmartLink data-cms-id={block.id} href={href} target={block.link?.target} className={`button ${block.variant ?? 'primary'}`}>
      {block.label}
    </SmartLink>
  )
}

function embedUrl(address: string): string | null {
  try {
    const url = new URL(address)
    const host = url.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`
    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      const id = url.searchParams.get('v') ?? /\/(?:embed|shorts|live)\/([^/?]+)/.exec(url.pathname)?.[1]
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    if (host.endsWith('vimeo.com')) {
      const id = /(\d{6,})/.exec(url.pathname)?.[1]
      return id ? `https://player.vimeo.com/video/${id}?dnt=1` : null
    }
  } catch {}
  return null
}

export function Video({ block }: BlockProps<'video'>) {
  const src = embedUrl(block.url)
  if (!src) return null
  const caption = text(block.caption)
  return (
    <figure data-cms-id={block.id} className="band flow">
      <div className={`container ${styles.figure}`}>
        <div className={styles.video}>
          <iframe src={src} title={caption ?? 'Video'} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        </div>
        {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
      </div>
    </figure>
  )
}

const CALLOUT_ICONS = { info: 'Info', tip: 'Lightbulb', warning: 'TriangleAlert' } as const

export function Callout({ block }: BlockProps<'callout'>) {
  const tone = block.tone ?? 'info'
  return (
    <div data-cms-id={block.id} className="band flow">
      <aside className={`narrow ${styles.callout} ${styles[`callout-${tone}`] ?? ''}`} role="note">
        <Icon name={CALLOUT_ICONS[tone]} className={styles.calloutIcon} size={22} />
        <div>
          {block.heading ? <p className={styles.calloutHeading}>{block.heading}</p> : null}
          <RichText value={block.body} className="prose" />
        </div>
      </aside>
    </div>
  )
}
