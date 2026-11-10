'use client'

import type { CmsCountdown } from '@bifrost-orbit-cms/sdk'
import { useCountdown, type BlockProps } from '@bifrost-orbit-cms/sdk/react'
import { useMemo, type ReactNode } from 'react'

import { SmartLink } from '@/components/ui/smart-link'
import { linkHref } from '@/lib/values'

import styles from './blocks.module.css'

const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
] as const

export function Countdown({ block }: BlockProps<'countdown'>) {
  const countdown = (block as { countdown?: CmsCountdown | null }).countdown ?? null
  const now = useMemo(() => new Date().toISOString(), [])
  const left = useCountdown(countdown, now)
  if (!countdown) return null
  const button = linkHref(countdown.button)
  let body: ReactNode = null
  if (countdown.display === 'followUp' && countdown.followUp) {
    const href = linkHref(countdown.followUp.link)
    body = href ? <SmartLink href={href} className="button">{countdown.followUp.text}</SmartLink> : <p className="lead">{countdown.followUp.text}</p>
  } else if (countdown.display === 'ended' || (left?.done && block.atZero === 'ended')) {
    body = countdown.endedText ? <p className="lead">{countdown.endedText}</p> : null
  } else if (countdown.display === 'countdown' && !left?.done) {
    body = (
      <div className={`${styles.timer} ${styles[`timer-${countdown.style}`] ?? ''}`} role="timer" aria-live="off">
        {UNITS.map(([unit, label]) => (
          <div key={unit} className={styles.timerUnit}>
            <span className={styles.timerValue}>{left ? String(left[unit]).padStart(2, '0') : '--'}</span>
            <span className={styles.timerLabel}>{label}</span>
          </div>
        ))}
      </div>
    )
  }
  if (!body) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className={`container ${styles.countdown}`}>
        {countdown.label ? <h2 className={styles.countdownLabel}>{countdown.label}</h2> : null}
        {body}
        {button && countdown.display === 'countdown' ? (
          <SmartLink href={button} target={countdown.button?.target} className="button">
            {countdown.button?.label ?? 'Find out more'}
          </SmartLink>
        ) : null}
      </div>
    </section>
  )
}
