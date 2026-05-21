import CourseCard from '../components/CourseCard'
import SectionTitle from '../components/SectionTitle'
import WhatsAppButton from '../components/WhatsAppButton'
import { courses, generalQueryMessage } from '../data/courses'

export default function SendQuery() {
  return (
    <>
      <section className="page-hero page-hero--center">
        <div className="container narrow">
          <p className="eyebrow">Send query</p>
          <h1>Inquire directly on WhatsApp</h1>
          <p>
            No form and no signup required. Choose a course below or send a
            general query to Kuldeep Sharma.
          </p>
          <div className="hero__actions hero__actions--center">
            <WhatsAppButton message={generalQueryMessage} label="General WhatsApp Query" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Course inquiry"
            title="Select the course you want to discuss"
            text="Each WhatsApp button opens with the correct course-wise message."
          />
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
