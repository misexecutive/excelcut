export default function SectionTitle({ eyebrow, title, text, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}
