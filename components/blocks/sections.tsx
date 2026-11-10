import type { ReactNode } from 'react'
import { CmsImage, RichText, type BlockProps } from '@bifrost-orbit-cms/sdk/react'

import { Icon } from '@/components/ui/icon'
import { SectionHead } from '@/components/ui/section-head'
import { SmartLink } from '@/components/ui/smart-link'
import { Stars } from '@/components/ui/stars'
import { entry, lines, linkHref, number, text } from '@/lib/values'

import styles from './blocks.module.css'

export function filled(slot: ReactNode): boolean {
  return Array.isArray(slot) ? slot.length > 0 : Boolean(slot)
}

export function Hero({ block, slots }: BlockProps<'hero'>) {
  return (
    <section data-cms-id={block.id} className={`band ${styles.hero} ${block.image ? styles.heroWithImage : ''}`}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroText}>
          {block.eyebrow ? <p className="eyebrow">{block.eyebrow}</p> : null}
          <h1>{block.heading}</h1>
          <RichText value={block.description} className="lead" />
          {filled(slots.button) ? <div className="actions">{slots.button}</div> : null}
        </div>
        {block.image ? (
          <div className={`frame ${styles.heroImage}`}>
            <CmsImage image={block.image} sizes="(min-width: 960px) 560px, 100vw" priority />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function Cta({ block, slots }: BlockProps<'cta'>) {
  return (
    <section data-cms-id={block.id} className="band">
      <div className={`container inverse ${styles.cta}`}>
        <div className={styles.ctaText}>
          <h2>{block.heading}</h2>
          <RichText value={block.body} className="lead" />
        </div>
        {filled(slots.button) ? <div className="actions">{slots.button}</div> : null}
      </div>
    </section>
  )
}

const BACKGROUNDS = { default: '', muted: 'tinted', brand: 'inverse' } as const

export function Section({ block, slots }: BlockProps<'section'>) {
  return (
    <section data-cms-id={block.id} className={`band ${BACKGROUNDS[block.background ?? 'default'] ?? ''}`}>
      <div className="container">
        {block.title ? <SectionHead heading={block.title} /> : null}
        <div className={`nested ${styles.stack}`}>{slots.blocks}</div>
      </div>
    </section>
  )
}

export function Grid({ block, slots }: BlockProps<'grid'>) {
  if (!filled(slots.items)) return null
  return (
    <div data-cms-id={block.id} className="band">
      <div className={`container nested ${styles.grid} ${styles[`columns${block.columns}`] ?? styles.columns3}`}>{slots.items}</div>
    </div>
  )
}

export function Card({ block, slots }: BlockProps<'card'>) {
  return (
    <article data-cms-id={block.id} className={styles.card}>
      {block.image ? (
        <div className={`frame ${styles.cardImage}`}>
          <CmsImage image={block.image} sizes="(min-width: 960px) 400px, (min-width: 640px) 50vw, 100vw" />
        </div>
      ) : null}
      <div className={styles.cardBody}>
        <h3>{block.heading}</h3>
        <RichText value={block.body} className="prose" />
        {filled(slots.button) ? <div className={`actions ${styles.cardActions}`}>{slots.button}</div> : null}
      </div>
    </article>
  )
}

export function ProductCard({ block }: BlockProps<'productCard'>) {
  const href = entry(block.product)?.url ?? null
  return (
    <article data-cms-id={block.id} className={`${styles.card} ${styles.panel}`}>
      <div className={styles.cardBody}>
        <h3>{href ? <SmartLink href={href} className={styles.stretched}>{block.title}</SmartLink> : block.title}</h3>
        {block.price ? <p className={styles.price}>{block.price}</p> : null}
        <RichText value={block.summary} className="prose" />
      </div>
    </article>
  )
}

export function Testimonial({ block }: BlockProps<'testimonial'>) {
  const rating = number(block.rating)
  return (
    <div data-cms-id={block.id} className="band flow">
      <figure className={`narrow ${styles.panel} ${styles.testimonial}`}>
        {rating ? <Stars value={rating} /> : null}
        <blockquote>
          <RichText value={block.quote} className={styles.testimonialQuote} />
        </blockquote>
        {block.author ? <figcaption className={styles.byline}>{block.author}</figcaption> : null}
      </figure>
    </div>
  )
}

export function Quote({ block }: BlockProps<'quote'>) {
  return (
    <div data-cms-id={block.id} className="band">
      <figure className={`narrow ${styles.quote}`}>
        <blockquote>
          <RichText value={block.quote} className={styles.quoteText} />
        </blockquote>
        {block.author || block.photo ? (
          <figcaption className={styles.quotePerson}>
            {block.photo ? (
              <span className={`frame ${styles.avatar}`}>
                <CmsImage image={block.photo} sizes="56px" alt="" />
              </span>
            ) : null}
            <span>
              {block.author ? <span className={styles.byline}>{block.author}</span> : null}
              {block.role ? <span className={styles.role}>{block.role}</span> : null}
            </span>
          </figcaption>
        ) : null}
      </figure>
    </div>
  )
}

export function Features({ block, slots }: BlockProps<'features'>) {
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} rich />
        {filled(slots.items) ? <div className={`${styles.grid} ${styles.columns3}`}>{slots.items}</div> : null}
      </div>
    </section>
  )
}

export function FeatureItem({ block }: BlockProps<'featureItem'>) {
  return (
    <div data-cms-id={block.id} className={styles.feature}>
      {block.icon ? (
        <span className={styles.iconBadge}>
          <Icon name={block.icon} size={22} />
        </span>
      ) : null}
      <h3>{block.heading}</h3>
      <RichText value={block.body} className="prose" />
    </div>
  )
}

export function ImageText({ block, slots }: BlockProps<'imageText'>) {
  return (
    <section data-cms-id={block.id} className="band">
      <div className={`container ${styles.split} ${block.imageSide === 'left' ? styles.imageLeft : ''}`}>
        <div className={styles.splitText}>
          {block.eyebrow ? <p className="eyebrow">{block.eyebrow}</p> : null}
          <h2>{block.heading}</h2>
          <RichText value={block.body} className="prose" />
          {filled(slots.button) ? <div className="actions">{slots.button}</div> : null}
        </div>
        {block.image ? (
          <div className={`frame ${styles.splitImage}`}>
            <CmsImage image={block.image} sizes="(min-width: 960px) 600px, 100vw" />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function Stats({ block, slots }: BlockProps<'stats'>) {
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        {block.heading ? <SectionHead heading={block.heading} /> : null}
        <dl className={styles.stats}>{slots.items}</dl>
      </div>
    </section>
  )
}

export function Stat({ block }: BlockProps<'stat'>) {
  return (
    <div data-cms-id={block.id} className={styles.stat}>
      <dt>{block.label}</dt>
      <dd>{block.value}</dd>
    </div>
  )
}

export function Faq({ block, slots }: BlockProps<'faq'>) {
  return (
    <section data-cms-id={block.id} className="band">
      <div className="narrow">
        <SectionHead heading={block.heading} intro={block.intro} rich />
        <div className={styles.faq}>{slots.items}</div>
      </div>
    </section>
  )
}

export function FaqItem({ block }: BlockProps<'faqItem'>) {
  return (
    <details data-cms-id={block.id} className={styles.faqItem}>
      <summary>
        <span>{block.question}</span>
        <Icon name="Plus" size={20} className={styles.faqIcon} />
      </summary>
      <RichText value={block.answer} className={`prose ${styles.faqAnswer}`} />
    </details>
  )
}

export function Team({ block, slots }: BlockProps<'team'>) {
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={block.heading} intro={block.intro} rich />
        <div className={`${styles.grid} ${styles.columns4}`}>{slots.members}</div>
      </div>
    </section>
  )
}

export function TeamMember({ block }: BlockProps<'teamMember'>) {
  return (
    <article data-cms-id={block.id} className={styles.person}>
      <div className={`frame ${styles.portrait}`}>{block.photo ? <CmsImage image={block.photo} sizes="(min-width: 960px) 280px, 50vw" /> : null}</div>
      <h3 className={styles.personName}>{block.name}</h3>
      {block.role ? <p className={styles.role}>{block.role}</p> : null}
      {block.bio ? <p className={styles.small}>{block.bio}</p> : null}
    </article>
  )
}

export function Gallery({ block }: BlockProps<'gallery'>) {
  const pictures = block.images ?? []
  if (!pictures.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        {block.heading ? <SectionHead heading={block.heading} /> : null}
        <ul className={styles.gallery}>
          {pictures.map((picture) => (
            <li key={picture.id}>
              <figure>
                <CmsImage image={picture} sizes="(min-width: 960px) 400px, (min-width: 640px) 50vw, 100vw" className={styles.galleryImage} />
                {picture.title ? <figcaption className={styles.caption}>{picture.title}</figcaption> : null}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Logos({ block, slots }: BlockProps<'logos'>) {
  if (!filled(slots.items)) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        {block.heading ? <p className={styles.logosHeading}>{block.heading}</p> : null}
        <ul className={styles.logos}>{slots.items}</ul>
      </div>
    </section>
  )
}

export function Logo({ block }: BlockProps<'logo'>) {
  const href = linkHref(block.link)
  const picture = block.image ? <CmsImage image={block.image} alt={block.name} sizes="160px" className={styles.logoImage} /> : <span>{block.name}</span>
  return (
    <li data-cms-id={block.id} className={styles.logo}>
      {href ? (
        <SmartLink href={href} target={block.link?.target}>
          {picture}
        </SmartLink>
      ) : (
        picture
      )}
    </li>
  )
}

export function Steps({ block, slots }: BlockProps<'steps'>) {
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={block.heading} intro={block.intro} rich />
        <ol className={styles.steps}>{slots.items}</ol>
      </div>
    </section>
  )
}

export function Step({ block }: BlockProps<'step'>) {
  return (
    <li data-cms-id={block.id} className={styles.step}>
      <h3>{block.heading}</h3>
      <RichText value={block.body} className="prose" />
    </li>
  )
}

export function ContactDetails({ block, slots }: BlockProps<'contactDetails'>) {
  const address = lines(block.address)
  const hours = lines(block.openingHours)
  const email = text(block.email)
  const phone = text(block.phone)
  return (
    <section data-cms-id={block.id} className="band">
      <div className={`container ${styles.contact}`}>
        <div className={styles.splitText}>
          {block.heading ? <h2>{block.heading}</h2> : null}
          <RichText value={block.intro} className="lead" />
          {filled(slots.button) ? <div className="actions">{slots.button}</div> : null}
        </div>
        <dl className={`${styles.panel} ${styles.contactList}`}>
          {email ? (
            <div>
              <dt>
                <Icon name="Mail" size={18} /> Email
              </dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
          ) : null}
          {phone ? (
            <div>
              <dt>
                <Icon name="Phone" size={18} /> Phone
              </dt>
              <dd>
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
              </dd>
            </div>
          ) : null}
          {address.length ? (
            <div>
              <dt>
                <Icon name="MapPin" size={18} /> Address
              </dt>
              <dd>
                <address>
                  {address.map((line) => (
                    <span key={line} className={styles.line}>
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
          ) : null}
          {hours.length ? (
            <div>
              <dt>
                <Icon name="Clock" size={18} /> Opening hours
              </dt>
              <dd>
                {hours.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  )
}

export function Pricing({ block, slots }: BlockProps<'pricing'>) {
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={block.heading} intro={block.intro} rich centred />
        <div className={styles.plans}>{slots.plans}</div>
      </div>
    </section>
  )
}

export function PricingPlan({ block, slots }: BlockProps<'pricingPlan'>) {
  const features = lines(block.features)
  return (
    <article data-cms-id={block.id} className={`${styles.panel} ${styles.plan} ${block.highlighted ? styles.planHighlighted : ''}`}>
      <h3 className={styles.planName}>{block.name}</h3>
      <p className={styles.planPrice}>
        <span>{block.price}</span>
        {block.period ? <span className={styles.planPeriod}> {block.period}</span> : null}
      </p>
      {features.length ? (
        <ul className={styles.planFeatures}>
          {features.map((feature) => (
            <li key={feature}>
              <Icon name="Check" size={18} className={styles.check} />
              {feature}
            </li>
          ))}
        </ul>
      ) : null}
      {filled(slots.button) ? <div className={`actions ${styles.planActions}`}>{slots.button}</div> : null}
    </article>
  )
}
