import { commercePrice, commerceStock, type CmsCommerceCollection, type CmsCommerceProduct } from '@bifrost-orbit-cms/sdk'
import { CmsImage, type BlockProps } from '@bifrost-orbit-cms/sdk/react'

import { SectionHead } from '@/components/ui/section-head'
import { SmartLink } from '@/components/ui/smart-link'
import styles from './blocks.module.css'

const STOCK = { unavailable: null, soldOut: 'Sold out', low: 'Only a few left', inStock: null } as const

function CartButton({ product, label }: { product: CmsCommerceProduct; label: string }) {
  const stock = commerceStock(product)
  if (stock === 'soldOut') return <span className={`button secondary ${styles.disabled}`} aria-disabled="true">Sold out</span>
  const href = product.addToCartUrl ?? product.url
  if (!href) return null
  return (
    <SmartLink href={href} className="button">
      {label}
      <span className="sr-only">: {product.name}</span>
    </SmartLink>
  )
}

function ProductTile({ product, heading, buttonLabel }: { product: CmsCommerceProduct; heading?: string; buttonLabel?: string }) {
  const price = commercePrice(product)
  const was = product.compareAtPrice !== null && product.price !== null && product.compareAtPrice > product.price ? commercePrice({ price: product.compareAtPrice, priceMax: null, currency: product.currency }) : null
  const note = STOCK[commerceStock(product)]
  return (
    <article className={styles.card}>
      <div className={`frame ${styles.productImage}`}>{product.image ? <CmsImage image={product.image} sizes="(min-width: 960px) 300px, 50vw" /> : null}</div>
      <div className={styles.cardBody}>
        {product.vendor ? <p className={styles.meta}>{product.vendor}</p> : null}
        <h3 className={styles.productName}>{product.url ? <SmartLink href={product.url}>{heading || product.name}</SmartLink> : heading || product.name}</h3>
        <p className={styles.priceLine}>
          {price ? <span className={styles.price}>{price}</span> : null}
          {was ? <s className={styles.was}>{was}</s> : null}
          {note ? <span className={styles.stockNote}>{note}</span> : null}
        </p>
        {buttonLabel ? (
          <div className={`actions ${styles.cardActions}`}>
            <CartButton product={product} label={buttonLabel} />
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function CommerceProductCard({ block }: BlockProps<'commerceProductCard'>) {
  if (!block.product?.available) return null
  return (
    <div data-cms-id={block.id} className="band flow">
      <div className={`narrow ${styles.single}`}>
        <ProductTile product={block.product} heading={block.heading} buttonLabel={block.buttonLabel || 'Add to cart'} />
      </div>
    </div>
  )
}

export function CommerceProductGrid({ block }: BlockProps<'commerceProductGrid'>) {
  const items = ((block as { items?: CmsCommerceProduct[] }).items ?? []).filter((product) => product.available)
  if (!items.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={block.heading} intro={block.intro} />
        <ul className={`${styles.grid} ${styles.columns4}`}>
          {items.map((product) => (
            <li key={product.id}>
              <ProductTile product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function CommerceAddToCart({ block }: BlockProps<'commerceAddToCart'>) {
  if (!block.product?.available) return null
  return (
    <div data-cms-id={block.id} className="band flow">
      <div className="narrow actions">
        <CartButton product={block.product} label={block.label} />
      </div>
    </div>
  )
}

export function CommerceCollectionList({ block }: BlockProps<'commerceCollectionList'>) {
  const collections = ((block as { collections?: CmsCommerceCollection[] }).collections ?? []).filter((collection) => collection.available)
  if (!collections.length) return null
  return (
    <section data-cms-id={block.id} className="band">
      <div className="container">
        <SectionHead heading={block.heading} intro={block.intro} />
        <ul className={`${styles.grid} ${styles.columns4}`}>
          {collections.map((collection) => (
            <li key={collection.id}>
              <article className={`${styles.card} ${styles.placeCard}`}>
                <div className={`frame ${styles.placeImage}`}>{collection.image ? <CmsImage image={collection.image} sizes="(min-width: 960px) 300px, 50vw" /> : null}</div>
                <div className={styles.cardBody}>
                  <h3>{collection.url ? <SmartLink href={collection.url} className={styles.stretched}>{collection.name}</SmartLink> : collection.name}</h3>
                  {collection.productCount !== null ? <p className={styles.meta}>{collection.productCount === 1 ? '1 product' : `${collection.productCount} products`}</p> : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
