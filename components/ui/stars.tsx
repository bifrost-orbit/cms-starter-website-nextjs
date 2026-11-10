import styles from './ui.module.css'

export function Stars({ value, size = 'small' }: { value: number; size?: 'small' | 'large' }) {
  const rounded = Math.round(value * 2) / 2
  return (
    <span className={`${styles.stars} ${size === 'large' ? styles.starsLarge : ''}`} role="img" aria-label={`Rated ${rounded} out of 5`}>
      <span aria-hidden="true" className={styles.starsTrack}>
        ★★★★★
        <span className={styles.starsFill} style={{ width: `${(rounded / 5) * 100}%` }}>
          ★★★★★
        </span>
      </span>
    </span>
  )
}
