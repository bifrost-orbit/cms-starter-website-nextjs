import { createElement } from 'react'
import * as lucide from 'lucide-react'
import type { LucideIcon, LucideProps } from 'lucide-react'

const library = lucide as unknown as Record<string, unknown>

function find(name: string): LucideIcon | null {
  const pascal = name
    .trim()
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
  const found = library[pascal] ?? library[`${pascal}Icon`]
  return found && typeof found === 'object' && '$$typeof' in found ? (found as LucideIcon) : null
}

export function Icon({ name, ...props }: { name: string | null | undefined } & LucideProps) {
  const found = name ? find(name) : null
  if (!found) return null
  return createElement(found, { 'aria-hidden': true, strokeWidth: 1.75, ...props })
}
