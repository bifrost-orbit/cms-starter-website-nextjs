import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

import { isExternal } from '@/lib/values'

type Props = Omit<ComponentProps<'a'>, 'href' | 'target'> & { href: string; target?: string | null; children: ReactNode }

export function SmartLink({ href, target, children, ...props }: Props) {
  const blank = target === '_blank'
  if (href.startsWith('/') && !blank) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target={blank ? '_blank' : undefined} rel={blank || isExternal(href) ? 'noopener noreferrer' : undefined} {...props}>
      {children}
      {blank ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}
