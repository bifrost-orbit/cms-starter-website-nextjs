import 'server-only'
import { cache } from 'react'
import type { CmsBanner, CmsImage, CmsNavItem, CmsTimed } from '@bifrost-orbit-cms/sdk'

import { cms } from './cms'
import { image, lines, text } from './values'

export interface SiteSettings {
  siteName: string
  tagline: string | null
  logo: CmsImage | null
  email: string | null
  phone: string | null
  address: string[]
  social: string[]
  footerNote: string | null
}

async function quietly<T>(load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await load()
  } catch (error) {
    console.error(error)
    return fallback
  }
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const global = await quietly(() => cms.findGlobal({ key: 'siteSettings' }), null)
  const fields = global?.fields ?? {}
  return {
    siteName: text(fields.siteName) ?? 'Website',
    tagline: text(fields.tagline),
    logo: image(fields.logo),
    email: text(fields.email),
    phone: text(fields.phone),
    address: lines(fields.address),
    social: lines(fields.social).filter((line) => /^https?:\/\//.test(line)),
    footerNote: text(fields.footerNote),
  }
})

export const getMenu = cache(async (key: 'header' | 'footer'): Promise<CmsNavItem[]> => {
  const menu = await quietly(() => cms.findNavigation({ key }), null)
  return menu?.items ?? []
})

export const getBanners = cache(async (): Promise<CmsTimed<CmsBanner> | null> => quietly(() => cms.getBanners({ everyPage: true }), null))
