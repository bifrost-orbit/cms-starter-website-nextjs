import Link from 'next/link'
import { CmsImage } from '@bifrost-orbit-cms/sdk/react'

import { getMenu, getSettings } from '@/lib/site'

import { SiteNav } from './site-nav'
import styles from './site.module.css'

export async function SiteHeader() {
  const [settings, items] = await Promise.all([getSettings(), getMenu('header')])
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" className={styles.brand}>
          {settings.logo ? <CmsImage image={settings.logo} alt={settings.siteName} sizes="200px" priority className={styles.logo} /> : <span className={styles.siteName}>{settings.siteName}</span>}
        </Link>
        <SiteNav items={items} />
      </div>
    </header>
  )
}
