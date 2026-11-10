import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { cache } from 'react'
import { gone } from '@bifrost-orbit-cms/sdk/next'
import { JsonLd, toMetadata } from '@bifrost-orbit-cms/sdk/seo'

import { PageBody } from '@/components/page-body'
import { cms } from '@/lib/cms'

type Props = { params: Promise<{ slug?: string[] }> }

export const revalidate = 60

export function generateStaticParams() {
  return []
}

const load = cache(async (path: string, preview: boolean) => cms.resolve({ path, preview, include: ['references'] }))

async function resolveFor({ params }: Props) {
  const { slug = [] } = await params
  const { isEnabled } = await draftMode()
  return load(`/${slug.join('/')}`, isEnabled)
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const result = await resolveFor(props)
  return result.kind === 'page' ? toMetadata(result.page) : {}
}

export default async function Page(props: Props) {
  const result = await resolveFor(props)

  if (result.kind === 'redirect') {
    if (result.permanent) permanentRedirect(result.to)
    redirect(result.to)
  }
  if (result.kind === 'gone') gone()
  if (result.kind === 'notFound') notFound()

  return (
    <>
      <JsonLd page={result.page} />
      <PageBody page={result.page} />
    </>
  )
}
