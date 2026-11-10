import 'server-only'
import type { CmsComponent } from '@bifrost-orbit-cms/sdk'

import { cms } from './cms'
import { listKey, toCard, walk, type EntryLists } from './enrich'

export async function loadLists(components: CmsComponent[], options: { locale?: string; preview?: boolean } = {}): Promise<EntryLists> {
  const keys = new Set<string>()
  walk(components, (node) => {
    if (node.type !== 'entryList') return
    const key = listKey(node.fields)
    if (key) keys.add(key)
  })
  const loaded = await Promise.all(
    [...keys].map(async (key) => {
      const [type, limit] = key.split(':') as [string, string]
      try {
        const list = await cms.list({ type, perPage: Number(limit), sort: '-publishedAt', include: ['fields'], locale: options.locale, preview: options.preview })
        return [key, list.items.filter((item) => item.url).map(toCard)] as const
      } catch {
        return [key, []] as const
      }
    }),
  )
  return Object.fromEntries(loaded)
}
