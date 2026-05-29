import { ArrowRight, CalendarDays, CheckCircle2, MonitorPlay, Video } from 'lucide-react'
import FloatingElements from './FloatingElements'
import InterestPulse from './InterestPulse'
import WhatsAppButton from './WhatsAppButton'
import { generalQueryMessage } from '../data/courses'

export default function Hero() {
  return (
    <section className="hero">
      <FloatingElements />
      <div className="container hero__grid">
        <div className="hero__content">
          <div className="live-badge">
            <span />
            LIVE trainer-led classes
          </div>
          <h1>Master Excel, Power BI & Apps Script Through Live Interactive Classes</h1>
          <p>
            Join trainer-led live sessions where you can ask doubts instantly,
            practice on real business cases, and learn skills used in daily
            office work.
          </p>
          <div className="hero__actions">
            <WhatsAppButton
              message={generalQueryMessage}
              label="Send WhatsApp Inquiry"
            />
            <a href="#courses" className="secondary-button">
              Explore Courses <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <InterestPulse />
        </div>

        <div className="hero-mockup" aria-label="Live class preview">
          <div className="hero-mockup__header">
            <div>
              <span className="status-dot" />
              Live class room
            </div>
            <strong>7:30 PM batch</strong>
          </div>
          <div className="hero-mockup__screen">
            <div className="dashboard-card dashboard-card--wide">
              <MonitorPlay size={22} aria-hidden="true" />
              <span>Advanced Excel live practice</span>
            </div>
            <div className="mini-bars">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="class-chat">
              <p>Student: Sir, XLOOKUP error aa raha hai?</p>
              <p>Trainer: Share screen, we will solve it now.</p>
            </div>
          </div>
          <div className="hero-mockup__cards">
            <span>
              <Video size={17} aria-hidden="true" />
              Live session
            </span>
            <span>
              <CheckCircle2 size={17} aria-hidden="true" />
              Doubt solving
            </span>
            <span>
              <CalendarDays size={17} aria-hidden="true" />
              Demo class
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
