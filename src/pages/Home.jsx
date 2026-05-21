import {
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Users,
} from 'lucide-react'
import CourseCard from '../components/CourseCard'
import SectionTitle from '../components/SectionTitle'
import WhatsAppButton from '../components/WhatsAppButton'
import trainerImage from '../assets/kuldeep_sharma.png'
import { courses, generalQueryMessage } from '../data/courses'

const reasons = [
  {
    icon: <GraduationCap size={27} aria-hidden="true" />,
    title: 'Practical Training',
    text: 'Learn through real business examples, guided exercises, and project-style assignments.',
  },
  {
    icon: <BarChart3 size={27} aria-hidden="true" />,
    title: 'Business Usage Focus',
    text: 'Every topic connects to reporting, automation, dashboards, or daily office productivity.',
  },
  {
    icon: <Users size={27} aria-hidden="true" />,
    title: 'Career Oriented',
    text: 'Build skills that support analyst, MIS, operations, and automation-focused roles.',
  },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">ExcelCut online academy</p>
            <div className="hero-offer-strip" aria-label="Limited period demo session offer">
              <span>2 Days Demo Session for LIMITED PERIOD only</span>
            </div>
            <h1>Best Skill Growth Courses for Working Professionals.</h1>
            <p>
              Learn Advanced Excel, Power BI, and Google Apps Script through
              practical, business-focused training designed for real workplace
              growth.
            </p>
            <div className="hero__actions">
              <WhatsAppButton message={generalQueryMessage} label="Ask for Details" />
              <a href="#courses" className="secondary-button">
                Explore Courses
              </a>
            </div>
          </div>

          <div className="trainer-hero" aria-label="Trainer Kuldeep Sharma">
            <div className="trainer-hero__frame">
              <img src={trainerImage} alt="Kuldeep Sharma" />
            </div>
            <div className="trainer-signature">
              <span>Kuldeep Sharma</span>
              <p>Trainer and course mentor</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="courses">
        <div className="container">
          <SectionTitle
            eyebrow="Choose your course"
            title="Skill-building courses for modern office work"
            text="Start with one focused course or build a complete reporting and automation skill stack."
          />
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionTitle
            eyebrow="Why join"
            title="Designed for practical career growth"
            text="The training keeps theory tight and spends more time on useful workflows students can apply immediately."
          />
          <div className="feature-grid">
            {reasons.map((reason) => (
              <article className="feature-card" key={reason.title}>
                <div className="icon-box">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">Demo classes</p>
            <h2>Attend 2 Days Demo Classes before you decide</h2>
            <p>
              Get a clear view of the teaching style, course structure, and
              practical project approach before joining the complete program.
            </p>
          </div>
          <div className="check-list">
            {[
              'Understand the learning roadmap',
              'See real business examples',
              'Ask course-specific questions',
              'Confirm the best course for your goal',
            ].map((item) => (
              <span key={item}>
                <CheckCircle2 size={20} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-section__inner">
          <div>
            <p className="eyebrow">Start learning</p>
            <h2>Ready to discuss your course?</h2>
            <p>
              Message on WhatsApp for demo class details, batch timing, and the
              right course recommendation.
            </p>
          </div>
          <WhatsAppButton message={generalQueryMessage} label="Send Query" />
        </div>
      </section>
    </>
  )
}
