import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { CmsBridge } from '@bifrost-orbit-cms/sdk/next'

import { SiteBanner } from '@/components/site/site-banner'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { cms } from '@/lib/cms'
import { getBanners, getSettings } from '@/lib/site'

import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return { title: settings.siteName, description: settings.tagline ?? undefined }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#121311' },
  ],
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const banners = await getBanners()
  return (
    <html lang="en">
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteBanner banners={banners} placement="aboveHeader" />
        <SiteHeader />
        <SiteBanner banners={banners} placement="belowHeader" />
        <main id="content">{children}</main>
        <SiteFooter />
        <CmsBridge client={cms} />
      </body>
    </html>
  )
}
