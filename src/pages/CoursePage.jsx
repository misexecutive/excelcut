import { CheckCircle2, Clock, IndianRupee, Target } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import WhatsAppButton from '../components/WhatsAppButton'

export default function CoursePage({ course }) {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">Online course</p>
            <h1>{course.title} Course</h1>
            <p>{course.shortDescription}</p>
            <div className="hero__actions">
              <WhatsAppButton message={course.whatsappMessage} />
            </div>
          </div>
          <div className="price-card">
            <span>
              <IndianRupee size={22} aria-hidden="true" />
              Fee
            </span>
            <strong>{course.fee}</strong>
            <span>
              <Clock size={22} aria-hidden="true" />
              Duration
            </span>
            <strong>{course.duration}</strong>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-panel">
            <div className="panel-title">
              <Target size={25} aria-hidden="true" />
              <h2>Who should join</h2>
            </div>
            <div className="check-list">
              {course.audience.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={19} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="content-panel">
            <div className="panel-title">
              <CheckCircle2 size={25} aria-hidden="true" />
              <h2>Practical business usage focus</h2>
            </div>
            <p>
              This course is structured around real reporting, cleaning,
              automation, and decision-support situations instead of isolated
              tool features.
            </p>
          </article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionTitle
            eyebrow="Learning roadmap"
            title="What students will learn"
            text="Each module is built to move from concept to hands-on practice."
          />
          <div className="learning-grid">
            {course.learn.map((item) => (
              <div className="learning-item" key={item}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-section__inner">
          <div>
            <p className="eyebrow">Course inquiry</p>
            <h2>Ask for demo class details</h2>
            <p>
              The WhatsApp message is pre-filled with this course name, fee, and
              duration. You can edit it before sending.
            </p>
          </div>
          <WhatsAppButton message={course.whatsappMessage} />
        </div>
      </section>
    </>
  )
}
