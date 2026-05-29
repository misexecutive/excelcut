import { CalendarClock, HelpCircle, MonitorPlay, Presentation, Target } from 'lucide-react'
import SectionTitle from './SectionTitle'

const benefits = [
  {
    icon: HelpCircle,
    title: 'Ask doubts instantly',
    text: 'Bring your questions during the class and get explanations while the topic is fresh.',
  },
  {
    icon: Presentation,
    title: 'Real-time explanation',
    text: 'The trainer can slow down, repeat, or show another example based on the class response.',
  },
  {
    icon: MonitorPlay,
    title: 'Guided practice',
    text: 'Practice formulas, dashboards, reports, and automation flows with step-by-step guidance.',
  },
  {
    icon: CalendarClock,
    title: 'Scheduled learning',
    text: 'Live batch timing helps you stay consistent instead of postponing recorded lessons.',
  },
  {
    icon: Target,
    title: 'Business-focused usage',
    text: 'Examples are connected to reporting, data cleaning, dashboards, and office automation.',
  },
]

export default function LiveClassBenefits() {
  return (
    <section className="section section--soft" id="live-classes">
      <div className="container">
        <SectionTitle
          eyebrow="Live class clarity"
          title="Why live classes make learning easier"
          text="This website is focused on interactive, trainer-led learning. Recorded material may be useful, but live classes make doubt solving and guided practice easier."
        />
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
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
  )
}
