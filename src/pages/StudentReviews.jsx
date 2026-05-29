import { CheckCircle2, MessageCircle } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import WhatsAppButton from '../components/WhatsAppButton'
import { generalQueryMessage } from '../data/courses'

const points = [
  'Live trainer-led sessions with direct doubt support',
  'Course-wise WhatsApp inquiry before joining',
  'Practical examples from reporting, dashboards, and automation',
  'No fake reviews or unverifiable student claims on this page',
]

export default function StudentReviews() {
  return (
    <>
      <section className="page-hero page-hero--center">
        <div className="container narrow">
          <p className="eyebrow">Learner information</p>
          <h1>Clear details before you join</h1>
          <p>
            This page avoids fake testimonials and focuses on the live learning
            format, course inquiry flow, and what you can ask before enrolling.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-panel">
            <div className="panel-title">
              <MessageCircle size={25} aria-hidden="true" />
              <h2>What to ask on WhatsApp</h2>
            </div>
            <p>
              Share your current level, the course you are interested in, and
              whether you want demo class details, timing, duration, or fee
              information.
            </p>
            <div className="hero__actions">
              <WhatsAppButton message={generalQueryMessage} label="Send Inquiry" />
            </div>
          </article>

          <article className="content-panel">
            <SectionTitle
              align="left"
              eyebrow="Transparent positioning"
              title="What this website claims"
              text="The site communicates the available live class format without adding fake social proof."
            />
            <div className="check-list">
              {points.map((point) => (
                <span key={point}>
                  <CheckCircle2 size={19} aria-hidden="true" />
                  {point}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
