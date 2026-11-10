import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="band">
      <div className="narrow flow-text">
        <p className="eyebrow">Error 404</p>
        <h1>Page not found</h1>
        <p className="lead">
          The page you were looking for has moved, or was never here.
        </p>
        <div className="actions">
          <Link href="/" className="button">
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  )
}
