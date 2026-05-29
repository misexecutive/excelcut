import {
  Bot,
  CheckCircle2,
  FileSpreadsheet,
  LayoutDashboard,
  MessageCircleQuestion,
  TableProperties,
} from 'lucide-react'
import CourseCard from '../components/CourseCard'
import CTASection from '../components/CTASection'
import Faq from '../components/FAQ'
import Hero from '../components/Hero'
import LiveClassBenefits from '../components/LiveClassBenefits'
import SectionTitle from '../components/SectionTitle'
import WhatsAppButton from '../components/WhatsAppButton'
import { courses, generalQueryMessage } from '../data/courses'

const skillBlocks = [
  {
    icon: FileSpreadsheet,
    title: 'Excel formulas',
    text: 'Build useful formulas for lookup, logical checks, summaries, and report-ready outputs.',
  },
  {
    icon: TableProperties,
    title: 'Power Query workflows',
    text: 'Clean and reshape messy data so repeated reporting work becomes easier.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboards and visuals',
    text: 'Create practical dashboards that help explain sales, finance, operations, or MIS data.',
  },
  {
    icon: Bot,
    title: 'Apps Script automation',
    text: 'Automate Google Sheets tasks with custom menus, alerts, web apps, and workflows.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Live doubt solving',
    text: 'Ask questions during class and understand the exact step where you are stuck.',
  },
  {
    icon: CheckCircle2,
    title: 'Business examples',
    text: 'Practice with office-style cases instead of only tool features and disconnected theory.',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section" id="courses">
        <div className="container">
          <SectionTitle
            eyebrow="Live course catalog"
            title="Choose a practical live class"
            text="Each course is built around trainer-led sessions, guided practice, and direct doubt support during the live class."
          />
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <LiveClassBenefits />

      <section className="section" id="skills">
        <div className="container">
          <SectionTitle
            eyebrow="What you will learn"
            title="Skills connected to real office work"
            text="The focus is simple: understand the tool, practice the workflow, and connect it to business reporting or automation."
          />
          <div className="skill-grid">
            {skillBlocks.map(({ icon: Icon, title, text }) => (
              <article className="skill-card" key={title}>
                <div className="icon-box">
                  <Icon size={25} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <section className="section section--soft">
        <div className="container split-section">
          <div>
            <p className="eyebrow">Before enrolling</p>
            <h2>Ask your questions before deciding</h2>
            <p>
              Send a WhatsApp message for demo class details, batch timing, and
              course fit. You can mention your current skill level and the type
              of office work you want to improve.
            </p>
          </div>
          <div className="check-list panel-list">
            {[
              'Confirm whether Excel, Power BI, or Apps Script is the right first step',
              'Understand the live class format and practice style',
              'Ask about batch timing, duration, and fee',
              'Join demo classes before making a final decision',
            ].map((item) => (
              <span key={item}>
                <CheckCircle2 size={20} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      <section className="final-contact">
        <div className="container final-contact__inner">
          <div>
            <p className="eyebrow">Ready to connect?</p>
            <h2>Discuss live class details on WhatsApp</h2>
          </div>
          <WhatsAppButton message={generalQueryMessage} label="Send WhatsApp Inquiry" />
        </div>
      </section>
    </>
  )
}
