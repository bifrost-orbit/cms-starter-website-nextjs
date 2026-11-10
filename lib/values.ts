import type { CmsEntry, CmsImage, CmsLink } from '@bifrost-orbit-cms/sdk'

export const LOCALE = 'en-GB'

export function text(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null
}

export function number(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

export function image(value: unknown): CmsImage | null {
  return value && typeof value === 'object' && typeof (value as CmsImage).url === 'string' ? (value as CmsImage) : null
}

export function images(value: unknown): CmsImage[] {
  return Array.isArray(value) ? value.map(image).filter((entry): entry is CmsImage => entry !== null) : []
}

export function entry(value: unknown): CmsEntry | null {
  return value && typeof value === 'object' && typeof (value as CmsEntry).name === 'string' ? (value as CmsEntry) : null
}

export function lines(value: unknown): string[] {
  return (text(value) ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function linkHref(link: CmsLink | null | undefined): string | null {
  return link?.href || null
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}

export function formatDate(value: string | null | undefined, locale = LOCALE): string | null {
  if (!value) return null
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date)
}

export function formatDateTime(value: string, timeZone?: string, locale = LOCALE): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone }).format(new Date(value))
}

export function formatMinor(amount: number | null | undefined, currency: string | null | undefined, locale = LOCALE): string | null {
  if (amount === null || amount === undefined || !currency) return null
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: amount % 100 === 0 ? 0 : 2 }).format(amount / 100)
}

export function withQuery(href: string, params: Record<string, string | null | undefined>): string {
  const [base, hash = ''] = href.split('#')
  const query = Object.entries(params)
    .filter((pair): pair is [string, string] => Boolean(pair[1]))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
  if (!query) return href
  return `${base}${base!.includes('?') ? '&' : '?'}${query}${hash ? `#${hash}` : ''}`
}
