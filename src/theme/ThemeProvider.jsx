import { useEffect, useMemo, useState } from 'react'
import { defaultTheme, isThemeId, themes, themeStorageKey } from './themeConfig'
import { ThemeContext } from './useTheme'

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return defaultTheme
  }

  const savedTheme = window.localStorage.getItem(themeStorageKey)
  return isThemeId(savedTheme) ? savedTheme : defaultTheme
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = themeId
    window.localStorage.setItem(themeStorageKey, themeId)
  }, [themeId])

  const value = useMemo(() => {
    const activeTheme = themes.find((theme) => theme.id === themeId) ?? themes[0]

    return {
      activeTheme,
      themeId,
      setThemeId,
      themes,
    }
  }, [themeId])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
