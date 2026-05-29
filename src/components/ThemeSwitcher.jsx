import { Palette } from 'lucide-react'
import { useTheme } from '../theme/useTheme'

export default function ThemeSwitcher() {
  const { themeId, setThemeId, themes } = useTheme()

  return (
    <div className="theme-switcher" aria-label="Website theme selector">
      <span className="theme-switcher__label">
        <Palette size={16} aria-hidden="true" />
        Theme
      </span>
      <div className="theme-switcher__options">
        {themes.map((theme) => (
          <button
            type="button"
            key={theme.id}
            className={theme.id === themeId ? 'active' : undefined}
            onClick={() => setThemeId(theme.id)}
            aria-pressed={theme.id === themeId}
            title={theme.description}
          >
            {theme.shortName}
          </button>
        ))}
      </div>
    </div>
  )
}
