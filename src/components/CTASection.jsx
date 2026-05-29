import WhatsAppButton from './WhatsAppButton'
import { generalQueryMessage } from '../data/courses'

export default function CTASection() {
  return (
    <section className="cta-section" id="demo-class">
      <div className="container cta-section__inner">
        <div>
          <p className="eyebrow">Demo class inquiry</p>
          <h2>Join a demo class before deciding</h2>
          <p>
            Ask your questions, understand the batch timing, and confirm which
            live course matches your current work or learning goal.
          </p>
        </div>
        <WhatsAppButton message={generalQueryMessage} label="Ask for Demo Class" />
      </div>
    </section>
  )
}
