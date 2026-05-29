import { useTheme } from '../theme/useTheme'

const themeElements = {
  'excel-green': ['XLOOKUP', 'SUMIFS', 'Power Query', 'Dashboard', 'Clean Data', '=IF()'],
  'powerbi-dark': ['DAX', 'KPI', 'Model', 'Revenue', 'Power Query', 'Insights'],
  'live-classroom': ['LIVE', 'Doubt', 'Demo Class', 'Mentor-led', 'Practice', 'Chat'],
}

export default function FloatingElements() {
  const { themeId } = useTheme()
  const items = themeElements[themeId] ?? themeElements['excel-green']

  return (
    <div className="floating-elements" aria-hidden="true">
      {items.map((item, index) => (
        <span
          key={item}
          className={`floating-elements__item floating-elements__item--${index + 1}`}
        >
          {item}
        </span>
      ))}
      <span className="floating-grid" />
      <span className="floating-chart">
        <i />
        <i />
        <i />
      </span>
      <span className="floating-ring" />
    </div>
  )
}
