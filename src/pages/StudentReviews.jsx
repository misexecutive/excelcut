import { Star } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import WhatsAppButton from '../components/WhatsAppButton'
import { generalQueryMessage } from '../data/courses'

const reviews = [
  {
    name: 'Rohit M.',
    course: 'Advanced Excel',
    text: 'The sessions were very practical. I learned formulas, cleaning techniques, and reporting steps that I now use at work.',
  },
  {
    name: 'Priya S.',
    course: 'Power BI Mastery',
    text: 'The dashboard project helped me understand how Power Query, modeling, and DAX connect in a real report.',
  },
  {
    name: 'Aman G.',
    course: 'Google Apps Script',
    text: 'I was able to automate regular Google Sheets tasks and understand how scripts can save hours every week.',
  },
  {
    name: 'Neha R.',
    course: 'Advanced Excel',
    text: 'Clear explanations, useful examples, and enough practice to build confidence with business data.',
  },
  {
    name: 'Sandeep K.',
    course: 'Power BI Mastery',
    text: 'The course focused on reports that businesses actually need, not just random charts and theory.',
  },
  {
    name: 'Meera P.',
    course: 'Google Apps Script',
    text: 'Custom menus, email automation, and PDF generation basics were taught in a very approachable way.',
  },
]

export default function StudentReviews() {
  return (
    <>
      <section className="page-hero page-hero--center">
        <div className="container narrow">
          <p className="eyebrow">Student reviews</p>
          <h1>Practical learning, real confidence</h1>
          <p>
            Read sample feedback from learners who joined to improve reporting,
            dashboarding, and automation skills.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Testimonials"
            title="What students appreciate"
            text="Generic review placeholders with initials only, no fake photos."
          />
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={`${review.name}-${review.course}`}>
                <div className="review-card__header">
                  <div className="avatar">{review.name.slice(0, 1)}</div>
                  <div>
                    <h3>{review.name}</h3>
                    <p>{review.course}</p>
                  </div>
                </div>
                <div className="stars" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </div>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-section__inner">
          <div>
            <p className="eyebrow">Join next batch</p>
            <h2>Want to ask about courses?</h2>
            <p>Send a WhatsApp message and get demo class details directly.</p>
          </div>
          <WhatsAppButton message={generalQueryMessage} label="Send Query" />
        </div>
      </section>
    </>
  )
}
