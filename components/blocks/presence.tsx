import type { CmsReview, CmsReviewLocation } from '@bifrost-orbit-cms/sdk'
import type { BlockProps } from '@bifrost-orbit-cms/sdk/react'

import { SectionHead } from '@/components/ui/section-head'
import { SmartLink } from '@/components/ui/smart-link'
import { Stars } from '@/components/ui/stars'
import { formatDate } from '@/lib/values'

import styles from './blocks.module.css'

function rated(location: CmsReviewLocation | null | undefined): location is CmsReviewLocation & { average: number } {
  return Boolean(location?.available && location.average !== null)
}

function count(total: number): string {
  return total === 1 ? '1 review' : `${total.toLocaleString('en-GB')} reviews`
}

export function PresenceReviews({ block }: BlockProps<'presenceReviews'>) {
  const location = block.location
  const delivered = block as { reviews?: CmsReview[]; filterNote?: string | null }
  const reviews = delivered.reviews ?? []
  if (!location?.available || !reviews.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={block.heading} intro={block.intro} />
        {block.showSummary !== false && rated(location) ? (
          <p className={styles.ratingSummary}>
            <span className={styles.ratingValue}>{location.average.toFixed(1)}</span>
            <Stars value={location.average} size="large" />
            <span className={styles.meta}>{count(location.total)}</span>
          </p>
        ) : null}
        <ul className={`${styles.grid} ${styles.columns3}`}>
          {reviews.map((review) => (
            <li key={review.id}>
              <figure className={`${styles.panel} ${styles.testimonial}`}>
                {review.rating !== null ? <Stars value={review.rating} /> : null}
                {review.title ? <p className={styles.rowTitle}>{review.title}</p> : null}
                <blockquote>
                  <p>{review.text}</p>
                </blockquote>
                <figcaption className={styles.meta}>
                  {review.author} · {formatDate(review.date)} · {review.url ? <a href={review.url} rel="noopener noreferrer">{review.sourceName}</a> : review.sourceName}
                </figcaption>
                {review.reply ? (
                  <div className={styles.reply}>
                    <p className={styles.meta}>Our reply</p>
                    <p>{review.reply.text}</p>
                  </div>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
        {delivered.filterNote || location.disclosure ? <p className={`${styles.meta} ${styles.disclosure}`}>{[delivered.filterNote, location.disclosure].filter(Boolean).join(' ')}</p> : null}
      </div>
    </section>
  )
}

export function PresenceRatingBadge({ block }: BlockProps<'presenceRatingBadge'>) {
  const location = block.location
  if (!rated(location)) return null
  const badge = (
    <>
      <span className={styles.ratingValue}>{location.average.toFixed(1)}</span>
      <span>
        <Stars value={location.average} />
        <span className={styles.badgeText}>
          {block.label || 'Rated by our customers'}
          {block.showCount !== false ? ` · ${count(location.total)}` : ''}
        </span>
      </span>
    </>
  )
  return (
    <div data-cms-id={block.id} className="band flow">
      <div className="narrow">
        {location.reviewPageUrl ? (
          <SmartLink href={location.reviewPageUrl} className={`${styles.panel} ${styles.ratingBadge}`}>
            {badge}
          </SmartLink>
        ) : (
          <p className={`${styles.panel} ${styles.ratingBadge}`}>{badge}</p>
        )}
      </div>
    </div>
  )
}

export function PresenceReviewCta({ block }: BlockProps<'presenceReviewCta'>) {
  const href = block.location?.available ? block.location.reviewPageUrl : null
  if (!href) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className={`narrow ${styles.panel} ${styles.featured}`}>
        {block.heading ? <h2>{block.heading}</h2> : null}
        {block.text ? <p className="lead">{block.text}</p> : null}
        <div className="actions">
          <SmartLink href={href} className="button">
            {block.buttonLabel}
          </SmartLink>
        </div>
      </div>
    </section>
  )
}
