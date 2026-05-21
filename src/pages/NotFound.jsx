import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-hero page-hero--center">
      <div className="container narrow">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="secondary-button" to="/">
          Go Home
        </Link>
      </div>
    </section>
  )
}
