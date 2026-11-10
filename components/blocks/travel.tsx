import type { CmsDestinationPage, CmsTrip, CmsTravelGuide } from '@bifrost-orbit-cms/sdk'
import { CmsImage, type BlockProps } from '@bifrost-orbit-cms/sdk/react'

import { SectionHead } from '@/components/ui/section-head'
import { SmartLink } from '@/components/ui/smart-link'
import { Stars } from '@/components/ui/stars'
import { formatDate, formatMinor, number } from '@/lib/values'

import styles from './blocks.module.css'

interface Place {
  code: string
  name: string
  tagline: string | null
  image: CmsTrip['image']
  tripCount: number
  pageUrl: string | null
  countries?: Place[]
}

function tripHref(trip: CmsTrip): string | null {
  return trip.pageUrl ?? trip.url
}

function TripCard({ trip }: { trip: CmsTrip }) {
  const href = tripHref(trip)
  const price = formatMinor(trip.priceFrom, trip.currency)
  const next = trip.nextDepartures[0]
  return (
    <article className={styles.card}>
      <div className={`frame ${styles.cardImage}`}>
        {trip.image ? <CmsImage image={trip.image} sizes="(min-width: 960px) 400px, (min-width: 640px) 50vw, 100vw" /> : null}
        {trip.badge ? <span className={styles.badge}>{trip.badge}</span> : null}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.meta}>{[trip.days ? `${trip.days} days` : null, next ? `Next ${formatDate(next.startDate)}` : null].filter(Boolean).join(' · ')}</p>
        <h3>{href ? <SmartLink href={href} className={styles.stretched}>{trip.name}</SmartLink> : trip.name}</h3>
        {trip.summary ? <p className={styles.excerpt}>{trip.summary}</p> : null}
        <div className={styles.cardFooter}>
          {price ? <span className={styles.price}>From {price}</span> : null}
          {trip.rating?.average ? <Stars value={trip.rating.average} /> : null}
        </div>
      </div>
    </article>
  )
}

function TripGrid({ id, heading, intro, trips }: { id: string; heading?: string; intro?: string; trips: CmsTrip[] }) {
  const shown = trips.filter((trip) => trip.available)
  if (!shown.length) return null
  return (
    <section data-cms-id={id} className="band">
      <div className="container">
        <SectionHead heading={heading} intro={intro} />
        <ul className={`${styles.grid} ${styles.columns3}`}>
          {shown.map((trip) => (
            <li key={trip.id}>
              <TripCard trip={trip} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function TravelTripCards({ block }: BlockProps<'travelTripCards'>) {
  return <TripGrid id={block.id} heading={block.heading} intro={block.intro} trips={block.trips ?? []} />
}

export function TravelTripList({ block }: BlockProps<'travelTripList'>) {
  const trips = (block as { trips?: CmsTrip[] }).trips ?? []
  return <TripGrid id={block.id} heading={block.heading} trips={trips} />
}

export function TravelBookButton({ block }: BlockProps<'travelBookButton'>) {
  const href = block.departure?.bookingUrl ?? block.trip?.url ?? null
  if (!block.trip?.available || !href) return null
  return (
    <SmartLink data-cms-id={block.id} href={href} className="button">
      {block.label}
    </SmartLink>
  )
}

export function TravelNextDepartures({ block }: BlockProps<'travelNextDepartures'>) {
  const trip = block.trip
  const departures = (trip?.available ? trip.nextDepartures : []).slice(0, number(block.limit) ?? 4)
  if (!trip || !departures.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="narrow">
        <SectionHead heading={block.heading} />
        <ul className={styles.rows}>
          {departures.map((departure) => {
            const price = formatMinor(departure.priceFrom, departure.currency)
            const open = departure.status === 'open'
            return (
              <li key={departure.id} className={styles.row}>
                <div>
                  <p className={styles.rowTitle}>
                    {formatDate(departure.startDate)}
                    {departure.endDate ? ` to ${formatDate(departure.endDate)}` : ''}
                  </p>
                  <p className={styles.meta}>
                    {[departure.guaranteed ? 'Guaranteed' : null, departure.status === 'full' ? 'Full' : departure.placesLeft !== null ? `${departure.placesLeft} places left` : null, price ? `From ${price}` : null].filter(Boolean).join(' · ')}
                  </p>
                </div>
                {open && departure.bookingUrl ? (
                  <SmartLink href={departure.bookingUrl} className="button secondary">
                    Book<span className="sr-only"> {formatDate(departure.startDate)}</span>
                  </SmartLink>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <article className={`${styles.card} ${styles.placeCard}`}>
      <div className={`frame ${styles.placeImage}`}>{place.image ? <CmsImage image={place.image} sizes="(min-width: 960px) 300px, 50vw" /> : null}</div>
      <div className={styles.cardBody}>
        <h3>{place.pageUrl ? <SmartLink href={place.pageUrl} className={styles.stretched}>{place.name}</SmartLink> : place.name}</h3>
        <p className={styles.meta}>{place.tripCount === 1 ? '1 trip' : `${place.tripCount} trips`}</p>
      </div>
    </article>
  )
}

function Places({ id, heading, intro, places }: { id: string; heading?: string; intro?: string; places: Place[] }) {
  if (!places.length) return null
  return (
    <section data-cms-id={id} className="band">
      <div className="container">
        <SectionHead heading={heading} intro={intro} />
        <ul className={`${styles.grid} ${styles.columns4}`}>
          {places.map((place) => (
            <li key={place.code}>
              <PlaceCard place={place} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function TravelContinents({ block }: BlockProps<'travelContinents'>) {
  return <Places id={block.id} heading={block.heading} intro={block.intro} places={(block as { continents?: Place[] }).continents ?? []} />
}

export function TravelCountries({ block }: BlockProps<'travelCountries'>) {
  return <Places id={block.id} heading={block.heading} intro={block.intro} places={(block as { countries?: Place[] }).countries ?? []} />
}

export function TravelCountryFacts({ block }: BlockProps<'travelCountryFacts'>) {
  const destination = (block as { destination?: CmsDestinationPage | null }).destination
  if (!destination) return null
  const facts = (destination.facts ?? {}) as { capital?: string | null; languages?: string[] | null; currency?: { code?: string; name?: string } | string | null; timeZone?: string | null; callingCode?: string | null }
  const live = (destination.live ?? {}) as { weather?: { temperature?: number | null; description?: string | null } | null }
  const rows = [
    ['Capital', facts.capital ?? ''],
    ['Languages', (facts.languages ?? []).join(', ')],
    ['Currency', typeof facts.currency === 'string' ? facts.currency : (facts.currency?.name ?? facts.currency?.code ?? '')],
    ['Time zone', facts.timeZone ?? ''],
    ['Calling code', facts.callingCode ?? ''],
    ['Weather now', typeof live.weather?.temperature === 'number' ? `${Math.round(live.weather.temperature)}°C${live.weather.description ? `, ${live.weather.description}` : ''}` : ''],
  ].filter(([, value]) => Boolean(value))
  if (!rows.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={(block.heading ?? '').replace('{name}', destination.name)} />
        <dl className={styles.facts}>
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function TravelGuides({ block }: BlockProps<'travelGuides'>) {
  const guides = (block as { guides?: CmsTravelGuide[] }).guides ?? []
  if (!guides.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={block.heading} intro={block.intro} />
        <ul className={`${styles.grid} ${styles.columns4}`}>
          {guides.map((guide) => (
            <li key={guide.slug} className={styles.person}>
              <div className={`frame ${styles.portrait}`}>{guide.photo ? <CmsImage image={guide.photo} sizes="(min-width: 960px) 280px, 50vw" /> : null}</div>
              <h3 className={styles.personName}>{guide.pageUrl ? <SmartLink href={guide.pageUrl}>{guide.name}</SmartLink> : guide.name}</h3>
              {guide.role ? <p className={styles.role}>{guide.role}</p> : null}
              {guide.languages.length ? <p className={styles.meta}>{guide.languages.join(', ')}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
