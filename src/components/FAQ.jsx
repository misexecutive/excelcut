import SectionTitle from './SectionTitle'

const faqs = [
  {
    question: 'Are these live or recorded classes?',
    answer:
      'These are live online classes. The focus is trainer-led explanation, guided practice, and direct doubt solving during the session.',
  },
  {
    question: 'Can I ask doubts during the class?',
    answer:
      'Yes. You can ask questions during the live class so the trainer can explain the step or example clearly.',
  },
  {
    question: 'Is this suitable for working professionals?',
    answer:
      'Yes. The examples are built around practical office work like reports, data cleaning, dashboards, and automation.',
  },
  {
    question: 'Do I need prior experience?',
    answer:
      'Basic computer comfort is helpful. For the best course recommendation, send a WhatsApp inquiry with your current skill level.',
  },
  {
    question: 'How do I join demo classes?',
    answer:
      'Use the WhatsApp inquiry button and ask for demo class details, batch timing, and the best course for your goal.',
  },
  {
    question: 'What happens after I send WhatsApp inquiry?',
    answer:
      'A course-wise message opens in WhatsApp. You can edit and send it to ask about demo class, timing, duration, and fee details.',
  },
]

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <SectionTitle
          eyebrow="FAQ"
          title="Common questions before joining"
          text="Clear answers so you can decide whether the live class format is right for you."
        />
        <div className="faq-grid">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
