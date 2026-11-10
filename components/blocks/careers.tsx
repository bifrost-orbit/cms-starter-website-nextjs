import type { CmsCareersJob } from '@bifrost-orbit-cms/sdk'
import type { BlockProps } from '@bifrost-orbit-cms/sdk/react'

import { Icon } from '@/components/ui/icon'
import { SectionHead } from '@/components/ui/section-head'
import { SmartLink } from '@/components/ui/smart-link'

import styles from './blocks.module.css'

function details(job: CmsCareersJob): string {
  return [job.team, job.location, job.remote, job.type].filter(Boolean).join(' · ')
}

export function CareersJobList({ block }: BlockProps<'careersJobList'>) {
  const jobs = (block as { jobs?: CmsCareersJob[] }).jobs
  if (!jobs) return null
  const open = jobs.filter((job) => job.available)
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={block.heading} intro={block.intro} />
        {open.length ? (
          <ul className={styles.rows}>
            {open.map((job) => (
              <li key={job.id} className={`${styles.row} ${styles.linkRow}`}>
                <div>
                  <h3 className={styles.rowTitle}>{job.url ? <SmartLink href={job.url} className={styles.stretched}>{job.title}</SmartLink> : job.title}</h3>
                  <p className={styles.meta}>{details(job)}</p>
                </div>
                {job.salary ? <span className={styles.rowAside}>{job.salary}</span> : null}
                <Icon name="ArrowRight" size={20} className={styles.rowArrow} />
              </li>
            ))}
          </ul>
        ) : block.emptyText ? (
          <p className={`${styles.panel} ${styles.empty}`}>{block.emptyText}</p>
        ) : null}
      </div>
    </section>
  )
}

export function CareersFeaturedJob({ block }: BlockProps<'careersFeaturedJob'>) {
  const job = block.job
  if (!job?.available) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className={`narrow ${styles.panel} ${styles.featured}`}>
        <p className="eyebrow">{details(job)}</p>
        <h2>{block.heading || job.title}</h2>
        {block.text || job.summary ? <p className="lead">{block.text || job.summary}</p> : null}
        {job.salary ? <p className={styles.meta}>{job.salary}</p> : null}
        {job.url ? (
          <div className="actions">
            <SmartLink href={job.url} className="button">
              {block.buttonLabel || 'Read more and apply'}
            </SmartLink>
          </div>
        ) : null}
      </div>
    </section>
  )
}
