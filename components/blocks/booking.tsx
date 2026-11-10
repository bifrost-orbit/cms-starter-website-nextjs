import { bookingLength, bookingPrice, type CmsBookingLocation, type CmsBookingService, type CmsBookingStaff } from '@bifrost-orbit-cms/sdk'
import { CmsImage, type BlockProps } from '@bifrost-orbit-cms/sdk/react'

import { SectionHead } from '@/components/ui/section-head'
import { SmartLink } from '@/components/ui/smart-link'
import { formatDateTime, linkHref, number, withQuery } from '@/lib/values'

import styles from './blocks.module.css'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

type Delivered = { booking?: CmsBookingLocation | null; items?: CmsBookingService[] | CmsBookingStaff[]; team?: CmsBookingStaff[]; times?: { startsAt: string; staffIds: string[] }[] }

function bookHref(service: CmsBookingService, page: string | null, time?: string): string | null {
  if (page) return withQuery(page, { service: service.slug ?? service.id, time })
  return service.bookingUrl
}

function ServiceCard({ service, page, booking }: { service: CmsBookingService; page: string | null; booking: CmsBookingLocation | null }) {
  const href = bookHref(service, page)
  const price = bookingPrice(service)
  const length = bookingLength(service.durationMinutes)
  return (
    <article className={styles.card}>
      {service.image ? (
        <div className={`frame ${styles.cardImage}`}>
          <CmsImage image={service.image} sizes="(min-width: 960px) 400px, (min-width: 640px) 50vw, 100vw" />
        </div>
      ) : null}
      <div className={styles.cardBody}>
        {service.category ? <p className={styles.meta}>{service.category}</p> : null}
        <h3>{service.name}</h3>
        {service.summary ? <p className={styles.excerpt}>{service.summary}</p> : null}
        <p className={styles.priceLine}>
          {[length, price].filter(Boolean).join(' · ')}
          {service.nextAvailable ? <span className={styles.stockNote}>Next free {formatDateTime(service.nextAvailable, booking?.timeZone)}</span> : null}
        </p>
        {href ? (
          <div className={`actions ${styles.cardActions}`}>
            <SmartLink href={href} className="button secondary">
              Book<span className="sr-only"> {service.name}</span>
            </SmartLink>
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function BookingServiceList({ block }: BlockProps<'bookingServiceList'>) {
  const delivered = block as Delivered
  const services = ((delivered.items ?? []) as CmsBookingService[]).filter((service) => service.available)
  if (!delivered.booking || !services.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
        <ul className={`${styles.grid} ${styles.columns3}`}>
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} page={linkHref(block.bookLink)} booking={delivered.booking ?? null} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function BookingAppointment({ block }: BlockProps<'bookingAppointment'>) {
  const delivered = block as Delivered
  const booking = delivered.booking
  const services = ((delivered.items ?? []) as CmsBookingService[]).filter((service) => service.available)
  if (!booking || !services.length) return null
  const first = block.service?.id
  const ordered = [...services].sort((a, b) => Number(b.id === first) - Number(a.id === first))
  const hours = [...booking.openingHours].sort((a, b) => ((a.day + 6) % 7) - ((b.day + 6) % 7))
  return (
    <section data-cms-id={block.id} className="band">
      <div className={`container ${styles.contact}`}>
        <div>
          <SectionHead heading={block.heading} intro={block.intro} />
          <ul className={styles.rows}>
            {ordered.map((service) => (
              <li key={service.id} className={styles.row}>
                <div>
                  <p className={styles.rowTitle}>{service.name}</p>
                  <p className={styles.meta}>{[bookingLength(service.durationMinutes), bookingPrice(service)].filter(Boolean).join(' · ')}</p>
                </div>
                {service.bookingUrl ? (
                  <SmartLink href={service.bookingUrl} className="button secondary">
                    Book<span className="sr-only"> {service.name}</span>
                  </SmartLink>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <dl className={`${styles.panel} ${styles.contactList}`}>
          <div>
            <dt>{booking.kind === 'online' ? 'Online' : 'Where'}</dt>
            <dd>
              <span className={styles.line}>{booking.name}</span>
              {booking.address?.lines.map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
              {booking.address ? <span className={styles.line}>{[booking.address.postcode, booking.address.city].filter(Boolean).join(' ')}</span> : null}
            </dd>
          </div>
          {booking.phone || booking.email ? (
            <div>
              <dt>Contact</dt>
              <dd>
                {booking.phone ? (
                  <a className={styles.line} href={`tel:${booking.phone.replace(/[^\d+]/g, '')}`}>
                    {booking.phone}
                  </a>
                ) : null}
                {booking.email ? (
                  <a className={styles.line} href={`mailto:${booking.email}`}>
                    {booking.email}
                  </a>
                ) : null}
              </dd>
            </div>
          ) : null}
          {hours.length ? (
            <div>
              <dt>Opening hours</dt>
              <dd>
                {hours.map((day) => (
                  <span key={day.day} className={styles.line}>
                    {DAYS[day.day]} {day.ranges.map((range) => `${range.from} to ${range.to}`).join(', ')}
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

export function BookingNextTimes({ block }: BlockProps<'bookingNextTimes'>) {
  const delivered = block as Delivered
  const service = block.service
  const times = (delivered.times ?? []).slice(0, number(block.limit) ?? 6)
  if (!delivered.booking || !service?.available || !times.length) return null
  const page = linkHref(block.bookLink)
  return (
    <section data-cms-id={block.id} className="band">
      <div className="narrow">
        <SectionHead heading={block.heading} intro={service.name} />
        <ul className={styles.times}>
          {times.map((time) => {
            const label = formatDateTime(time.startsAt, delivered.booking?.timeZone)
            const href = bookHref(service, page, time.startsAt)
            return <li key={time.startsAt}>{href ? <SmartLink href={href} className="button secondary">{label}</SmartLink> : <span className="button secondary">{label}</span>}</li>
          })}
        </ul>
      </div>
    </section>
  )
}

export function BookingTeam({ block }: BlockProps<'bookingTeam'>) {
  const delivered = block as Delivered
  const people = ((delivered.items ?? []) as CmsBookingStaff[]).filter((person) => person.available)
  if (!delivered.booking || !people.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
        <ul className={`${styles.grid} ${styles.columns4}`}>
          {people.map((person) => (
            <li key={person.id} className={styles.person}>
              <div className={`frame ${styles.portrait}`}>{person.photo ? <CmsImage image={person.photo} sizes="(min-width: 960px) 280px, 50vw" /> : null}</div>
              <h3 className={styles.personName}>{person.name}</h3>
              {person.title ? <p className={styles.role}>{person.title}</p> : null}
              {person.bio ? <p className={styles.small}>{person.bio}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
