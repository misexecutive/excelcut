export const themes = [
  {
    id: 'excel-green',
    name: 'Excel Green Pro',
    shortName: 'Excel',
    description: 'Spreadsheet focused green theme',
  },
  {
    id: 'powerbi-dark',
    name: 'Power BI Dark Analytics',
    shortName: 'BI',
    description: 'Dashboard focused dark analytics theme',
  },
  {
    id: 'live-classroom',
    name: 'Clean Live Classroom',
    shortName: 'Live',
    description: 'Modern live learning theme',
  },
]

export const defaultTheme = themes[0].id
export const themeStorageKey = 'excelcut-theme'

export function isThemeId(value) {
  return themes.some((theme) => theme.id === value)
}
