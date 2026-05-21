import { ArrowRight, Clock, IndianRupee } from 'lucide-react'
import { Link } from 'react-router-dom'
import WhatsAppButton from './WhatsAppButton'

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <div className="course-card__top">
        <span className="course-card__badge">Online Course</span>
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
        {course.highlights.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="course-card__actions">
        <Link to={course.route} className="text-link">
          View Details <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <WhatsAppButton message={course.whatsappMessage} />
      </div>
    </article>
  )
}
