import { RichText } from '@bifrost-orbit-cms/sdk/react'

export function SectionHead({ eyebrow, heading, intro, rich = false, centred = false }: { eyebrow?: string | null; heading?: string | null; intro?: string | null; rich?: boolean; centred?: boolean }) {
  if (!eyebrow && !heading && !intro) return null
  return (
    <header className={`section-head${centred ? ' centred' : ''}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {heading ? <h2>{heading}</h2> : null}
      {intro ? rich ? <RichText value={intro} className="lead" /> : <p className="lead">{intro}</p> : null}
    </header>
  )
}
