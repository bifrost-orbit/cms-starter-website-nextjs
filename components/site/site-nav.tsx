'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import type { CmsNavItem } from '@bifrost-orbit-cms/sdk'
import { ChevronDown, Menu, X } from 'lucide-react'

import styles from './site.module.css'

function NavLink({ item, className, onPick }: { item: CmsNavItem; className?: string; onPick?: () => void }) {
  const path = usePathname()
  if (!item.href) return <span className={className}>{item.label}</span>
  const here = path === item.href || path === item.href.replace(/\/$/, '')
  const external = /^https?:\/\//.test(item.href) || item.target === '_blank'
  if (external) {
    return (
      <a href={item.href} target={item.target === '_blank' ? '_blank' : undefined} rel="noopener noreferrer" className={className} onClick={onPick}>
        {item.label}
      </a>
    )
  }
  return (
    <Link href={item.href} className={className} aria-current={here ? 'page' : undefined} onClick={onPick}>
      {item.label}
    </Link>
  )
}

function Dropdown({ item }: { item: CmsNavItem }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [open])

  return (
    <li ref={ref} className={styles.dropdown} onBlur={(event) => !ref.current?.contains(event.relatedTarget as Node) && setOpen(false)}>
      <button type="button" className={styles.navLink} aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        {item.label}
        <ChevronDown aria-hidden size={16} className={styles.chevron} />
      </button>
      <ul id={id} className={styles.menu} hidden={!open}>
        {item.href ? (
          <li>
            <NavLink item={{ ...item, label: `All ${item.label.toLowerCase()}` }} className={styles.menuLink} onPick={() => setOpen(false)} />
          </li>
        ) : null}
        {item.children.map((child) => (
          <li key={`${child.label}${child.href}`}>
            <NavLink item={child} className={styles.menuLink} onPick={() => setOpen(false)} />
            {child.description ? <p className={styles.menuNote}>{child.description}</p> : null}
          </li>
        ))}
      </ul>
    </li>
  )
}

export function SiteNav({ items }: { items: CmsNavItem[] }) {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const [seen, setSeen] = useState(path)
  const panel = useId()

  if (seen !== path) {
    setSeen(path)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!items.length) return null

  return (
    <nav aria-label="Main" className={styles.nav}>
      <ul className={styles.navList}>
        {items.map((item) =>
          item.children.length ? (
            <Dropdown key={`${item.label}${item.href}`} item={item} />
          ) : (
            <li key={`${item.label}${item.href}`}>
              <NavLink item={item} className={styles.navLink} />
            </li>
          ),
        )}
      </ul>
      <button type="button" className={styles.menuButton} aria-expanded={open} aria-controls={panel} onClick={() => setOpen((value) => !value)}>
        {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>
      <div id={panel} className={styles.mobilePanel} hidden={!open}>
        <ul className={styles.mobileList}>
          {items.map((item) => (
            <li key={`${item.label}${item.href}`}>
              <NavLink item={item} className={styles.mobileLink} onPick={() => setOpen(false)} />
              {item.children.length ? (
                <ul className={styles.mobileChildren}>
                  {item.children.map((child) => (
                    <li key={`${child.label}${child.href}`}>
                      <NavLink item={child} className={styles.mobileChild} onPick={() => setOpen(false)} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
