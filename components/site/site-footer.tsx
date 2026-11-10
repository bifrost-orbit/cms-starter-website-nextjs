import Link from 'next/link'

import { getMenu, getSettings } from '@/lib/site'

import styles from './site.module.css'

const NETWORKS: Record<string, string> = {
  'instagram.com': 'Instagram',
  'facebook.com': 'Facebook',
  'linkedin.com': 'LinkedIn',
  'x.com': 'X',
  'twitter.com': 'X',
  'youtube.com': 'YouTube',
  'tiktok.com': 'TikTok',
  'pinterest.com': 'Pinterest',
  'github.com': 'GitHub',
  'threads.net': 'Threads',
  'bsky.app': 'Bluesky',
  'vimeo.com': 'Vimeo',
  'strava.com': 'Strava',
}

function networkName(address: string): string {
  try {
    const host = new URL(address).hostname.replace(/^www\./, '')
    return NETWORKS[host] ?? host
  } catch {
    return address
  }
}

export async function SiteFooter() {
  const [settings, items] = await Promise.all([getSettings(), getMenu('footer')])
  const links = items.flatMap((item) => [item, ...item.children]).filter((item) => item.href)
  const contact = Boolean(settings.email || settings.phone || settings.address.length)
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.siteName}>
            {settings.siteName}
          </Link>
          {settings.tagline ? <p className={styles.tagline}>{settings.tagline}</p> : null}
        </div>
        {links.length ? (
          <nav aria-label="Footer" className={styles.footerColumn}>
            <h2 className={styles.footerHeading}>Explore</h2>
            <ul>
              {links.map((item) => (
                <li key={`${item.label}${item.href}`}>
                  {item.href!.startsWith('/') ? <Link href={item.href!}>{item.label}</Link> : <a href={item.href!}>{item.label}</a>}
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        {contact ? (
          <div className={styles.footerColumn}>
            <h2 className={styles.footerHeading}>Contact</h2>
            <ul>
              {settings.email ? (
                <li>
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </li>
              ) : null}
              {settings.phone ? (
                <li>
                  <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>{settings.phone}</a>
                </li>
              ) : null}
            </ul>
            {settings.address.length ? (
              <address className={styles.address}>
                {settings.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            ) : null}
          </div>
        ) : null}
        {settings.social.length ? (
          <div className={styles.footerColumn}>
            <h2 className={styles.footerHeading}>Follow</h2>
            <ul>
              {settings.social.map((address) => (
                <li key={address}>
                  <a href={address} rel="me noopener noreferrer">
                    {networkName(address)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className={`container ${styles.footerBase}`}>
        <p>
          © {new Date().getFullYear()} {settings.siteName}
        </p>
        {settings.footerNote ? <p>{settings.footerNote}</p> : null}
      </div>
    </footer>
  )
}
