import { Link } from 'react-router-dom'
import { courses } from '../data/courses'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h2>ExcelCut</h2>
          <p>Trainer: Kuldeep Sharma</p>
          <p>WhatsApp: +91-8384882675</p>
        </div>
        <div>
          <h3>Courses</h3>
          {courses.map((course) => (
            <Link key={course.id} to={course.route}>
              {course.title}
            </Link>
          ))}
        </div>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} Kuldeep Sharma. All rights reserved.
      </p>
    </footer>
  )
}
