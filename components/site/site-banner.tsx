'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import type { CmsBanner, CmsBannerPlacement, CmsCountdown, CmsTimed } from '@bifrost-orbit-cms/sdk'
import { bannerFor, useCountdown, useCurrentBanner, useLiveBanners } from '@bifrost-orbit-cms/sdk/react'

import { SmartLink } from '@/components/ui/smart-link'
import { linkHref } from '@/lib/values'

import styles from './site.module.css'

function Timer({ countdown, serverTime, id }: { countdown: CmsCountdown; serverTime: string; id: string }) {
  const left = useCountdown(countdown, serverTime)
  if (countdown.display === 'followUp' && countdown.followUp) return <span data-cms-id={id}>{countdown.followUp.text}</span>
  if (countdown.display === 'ended') return countdown.endedText ? <span data-cms-id={id}>{countdown.endedText}</span> : null
  if (countdown.display !== 'countdown' || left?.done) return null
  const parts = left ? [left.days ? `${left.days}d` : null, `${String(left.hours).padStart(2, '0')}h`, `${String(left.minutes).padStart(2, '0')}m`, `${String(left.seconds).padStart(2, '0')}s`].filter(Boolean) : ['--']
  return (
    <span data-cms-id={id} role="timer" className={styles.bannerTimer}>
      {countdown.label ? `${countdown.label} ` : null}
      {parts.join(' ')}
    </span>
  )
}

function Bar({ banner, serverTime }: { banner: CmsBanner; serverTime: string }) {
  const current = useCurrentBanner(banner, serverTime)
  if (!current) return null
  return (
    <div role="region" aria-label="Announcement" data-cms-banner={current.id} className={styles.banner} style={{ background: current.background, color: current.foreground }}>
      <div className={`container ${styles.bannerInner}`}>
        {current.blocks.map((block) => {
          if (block.type === 'message')
            return (
              <p key={block.id} data-cms-id={block.id}>
                {block.segments.map((segment, index) => (segment.highlight ? <strong key={index}>{segment.text}</strong> : <span key={index}>{segment.text}</span>))}
              </p>
            )
          if (block.type === 'countdown') return <Timer key={block.id} id={block.id} countdown={block.countdown} serverTime={serverTime} />
          if (block.type === 'promoCode')
            return (
              <span key={block.id} data-cms-id={block.id}>
                {block.label ? `${block.label} ` : null}
                <code className={styles.code}>{block.code}</code>
              </span>
            )
          if (block.type === 'button') {
            const href = linkHref(block.link)
            if (!href || !block.text) return null
            return (
              <SmartLink key={block.id} data-cms-id={block.id} href={href} target={block.link?.target} className={styles.bannerButton} style={{ background: current.foreground, color: current.background }}>
                {block.text}
              </SmartLink>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export function SiteBanner({ banners, placement }: { banners: CmsTimed<CmsBanner> | null; placement: CmsBannerPlacement }) {
  const path = usePathname() ?? '/'
  const live = useLiveBanners(banners)
  const banner = useMemo(() => bannerFor(live?.items, path, placement), [live, path, placement])
  if (!banner || !live) return null
  return <Bar banner={banner} serverTime={live.serverTime} />
}
