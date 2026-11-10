import type { CmsComponent, CmsContentSummary, CmsCountdown, CmsImage } from '@bifrost-orbit-cms/sdk'

import { image, number, text } from './values'

export interface EntryCard {
  id: string
  url: string | null
  name: string
  image: CmsImage | null
  excerpt: string | null
  date: string | null
  label: string | null
  icon: string | null
}

export type EntryLists = Record<string, EntryCard[]>

export const DEFAULT_LIMIT = 3

export function listKey(fields: Record<string, unknown>): string | null {
  const type = text(fields.contentType)?.trim()
  if (!type) return null
  return `${type}:${Math.min(Math.max(Math.round(number(fields.limit) ?? DEFAULT_LIMIT), 1), 24)}`
}

export function toCard(item: CmsContentSummary): EntryCard {
  const fields = item.fields ?? {}
  return {
    id: item.id,
    url: item.url,
    name: item.name,
    image: image(fields.image) ?? image(fields.photo),
    excerpt: text(fields.excerpt) ?? text(fields.summary),
    date: text(fields.publishedOn) ?? (fields.excerpt !== undefined ? item.publishedAt : null),
    label: text(fields.role) ?? text(fields.team) ?? text(fields.season) ?? ([text(fields.duration), text(fields.price)].filter(Boolean).join(' · ') || null),
    icon: text(fields.icon),
  }
}

export function walk(components: CmsComponent[] | undefined, visit: (node: CmsComponent) => void): void {
  for (const node of components ?? []) {
    visit(node)
    for (const children of Object.values(node.children ?? {})) walk(children, visit)
  }
}

function fallbackCountdown(fields: Record<string, unknown>): CmsCountdown | null {
  const endDate = text(fields.endDate)
  if (!endDate) return null
  return {
    label: text(fields.label),
    startsAt: null,
    endsAt: `${endDate}T${text(fields.endTime) ?? '23:59'}:00`,
    timeZone: text(fields.timeZone) ?? 'UTC',
    style: text(fields.style) ?? 'banner',
    icon: null,
    button: null,
    status: 'running',
    display: 'countdown',
    followUp: null,
    endedText: text(fields.endedText),
  }
}

export function enrich(components: CmsComponent[], lists: EntryLists): CmsComponent[] {
  return components.map((node) => {
    const children = Object.fromEntries(Object.entries(node.children ?? {}).map(([slot, list]) => [slot, enrich(list, lists)]))
    if (node.type === 'entryList') {
      const key = listKey(node.fields)
      return { ...node, children, fields: { ...node.fields, entries: key ? (lists[key] ?? null) : null } }
    }
    if (node.type === 'countdown') {
      const resolved = (node as CmsComponent & { countdown?: CmsCountdown }).countdown
      return { ...node, children, fields: { ...node.fields, countdown: resolved ?? fallbackCountdown(node.fields) } }
    }
    return { ...node, children }
  })
}
