import { ArrowRight, CheckCircle2, Clock, IndianRupee, Radio } from 'lucide-react'
import { Link } from 'react-router-dom'
import WhatsAppButton from './WhatsAppButton'

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <div className="course-card__top">
        <span className="course-card__badge">
          <Radio size={15} aria-hidden="true" />
          LIVE Sessions
        </span>
        <h3>{course.title}</h3>
        <p>{course.shortDescription}</p>
      </div>

      <div className="course-card__meta">
        <span>
          <IndianRupee size={18} aria-hidden="true" />
          {course.fee}
        </span>
        <span>
          <Clock size={18} aria-hidden="true" />
          {course.duration}
        </span>
      </div>

      <div className="pill-row">
        {course.topics.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="course-outcome">
        <CheckCircle2 size={18} aria-hidden="true" />
        <span>{course.outcome}</span>
      </div>

      <div className="course-card__actions">
        <Link to={course.route} className="text-link">
          View Details <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <WhatsAppButton message={course.whatsappMessage} label="Ask About This Class" />
      </div>
    </article>
  )
}
