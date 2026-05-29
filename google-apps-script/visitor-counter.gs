/**
 * ExcelCut visitor counter backend
 *
 * Setup notes:
 * 1. Create a Google Sheet with two tabs, or let this script create them:
 *    - VisitorStats
 *    - VisitorLogs
 * 2. Replace SPREADSHEET_ID with the actual Google Sheet ID.
 * 3. Deploy this Apps Script as a Web App.
 * 4. Execute as: Me.
 * 5. Who has access: Anyone.
 * 6. Copy the Web App URL and paste it into:
 *    src/config/visitorCounter.js
 *
 * Security note:
 * This is suitable for lightweight public landing page analytics on GitHub
 * Pages. It is not fraud-proof because anyone can call a public Web App URL.
 * For high-security analytics, use GA4, Cloudflare Analytics, or a server-side
 * validation layer.
 */

const SPREADSHEET_ID = 'REPLACE_WITH_YOUR_GOOGLE_SHEET_ID'
const STATS_SHEET_NAME = 'VisitorStats'
const LOGS_SHEET_NAME = 'VisitorLogs'
const SCRIPT_TIME_ZONE = 'Asia/Kolkata'

const METRICS = {
  totalPageViews: 'Total Page Views',
  uniqueVisitors: 'Unique Visitors',
  todayPageViews: 'Today Page Views',
  todayUniqueVisitors: 'Today Unique Visitors',
  lastVisitAt: 'Last Visit At',
}

function doGet(e) {
  const params = (e && e.parameter) || {}
  const action = params.action || 'stats'
  let payload

  try {
    if (action === 'visit') {
      payload = handleVisit(params)
    } else if (action === 'stats') {
      payload = {
        ok: true,
        stats: readStats(),
      }
    } else {
      payload = {
        ok: false,
        error: 'Unsupported action',
      }
    }
  } catch (error) {
    payload = {
      ok: false,
      error: error.message || 'Unknown error',
    }
  }

  return createResponse(payload, params.callback)
}

function handleVisit(params) {
  const visitorId = sanitizeValue(params.visitorId, 120)

  if (!visitorId) {
    return {
      ok: false,
      error: 'Missing visitorId',
    }
  }

  const lock = LockService.getScriptLock()
  lock.waitLock(10000)

  try {
    const sheets = ensureSheets()
    const statsSheet = sheets.statsSheet
    const logsSheet = sheets.logsSheet
    const scriptProperties = PropertiesService.getScriptProperties()
    const now = new Date()
    const todayKey = Utilities.formatDate(now, SCRIPT_TIME_ZONE, 'yyyy-MM-dd')

    resetTodayIfNeeded(statsSheet, scriptProperties, todayKey)

    const visitorPropertyKey = `visitor:${visitorId}`
    const todayVisitorPropertyKey = `today:${todayKey}:${visitorId}`
    const isNewVisitor = scriptProperties.getProperty(visitorPropertyKey) !== '1'
    const isNewTodayVisitor =
      scriptProperties.getProperty(todayVisitorPropertyKey) !== '1'
    const currentStats = readStatsFromSheet(statsSheet)

    const nextStats = {
      totalPageViews: currentStats.totalPageViews + 1,
      uniqueVisitors: currentStats.uniqueVisitors + (isNewVisitor ? 1 : 0),
      todayPageViews: currentStats.todayPageViews + 1,
      todayUniqueVisitors:
        currentStats.todayUniqueVisitors + (isNewTodayVisitor ? 1 : 0),
      lastVisitAt: now.toISOString(),
    }

    if (isNewVisitor) {
      scriptProperties.setProperty(visitorPropertyKey, '1')
    }

    if (isNewTodayVisitor) {
      scriptProperties.setProperty(todayVisitorPropertyKey, '1')
    }

    writeStatsToSheet(statsSheet, nextStats, now)
    appendVisitLog(logsSheet, {
      timestamp: now,
      visitorId,
      pageUrl: sanitizeValue(params.pageUrl, 500),
      referrer: sanitizeValue(params.referrer, 500),
      userAgent: sanitizeValue(params.userAgent, 500),
      visitDate: todayKey,
      isNewVisitor,
    })

    return {
      ok: true,
      stats: nextStats,
    }
  } finally {
    lock.releaseLock()
  }
}

function ensureSheets() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
  const statsSheet =
    spreadsheet.getSheetByName(STATS_SHEET_NAME) ||
    spreadsheet.insertSheet(STATS_SHEET_NAME)
  const logsSheet =
    spreadsheet.getSheetByName(LOGS_SHEET_NAME) ||
    spreadsheet.insertSheet(LOGS_SHEET_NAME)

  ensureStatsSheet(statsSheet)
  ensureLogsSheet(logsSheet)

  return {
    statsSheet,
    logsSheet,
  }
}

function ensureStatsSheet(sheet) {
  const headers = ['Metric', 'Value', 'Updated At']
  const metricRows = [
    [METRICS.totalPageViews, 0, ''],
    [METRICS.uniqueVisitors, 0, ''],
    [METRICS.todayPageViews, 0, ''],
    [METRICS.todayUniqueVisitors, 0, ''],
    [METRICS.lastVisitAt, '', ''],
  ]

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    sheet.getRange(2, 1, metricRows.length, 3).setValues(metricRows)
    sheet.setFrozenRows(1)
    return
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])

  const existingMetrics =
    sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat()
      : []

  metricRows.forEach((row) => {
    if (!existingMetrics.includes(row[0])) {
      sheet.appendRow(row)
    }
  })
}

function ensureLogsSheet(sheet) {
  const headers = [
    'Timestamp',
    'Visitor ID',
    'Page URL',
    'Referrer',
    'User Agent',
    'Visit Date',
    'Is New Visitor',
  ]

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    sheet.setFrozenRows(1)
    return
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
}

function resetTodayIfNeeded(statsSheet, scriptProperties, todayKey) {
  const savedDate = scriptProperties.getProperty('currentDate')

  if (savedDate === todayKey) {
    return
  }

  scriptProperties.setProperty('currentDate', todayKey)
  writeMetric(statsSheet, METRICS.todayPageViews, 0, new Date())
  writeMetric(statsSheet, METRICS.todayUniqueVisitors, 0, new Date())
}

function readStats() {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)

  try {
    const sheets = ensureSheets()
    const scriptProperties = PropertiesService.getScriptProperties()
    const todayKey = Utilities.formatDate(new Date(), SCRIPT_TIME_ZONE, 'yyyy-MM-dd')
    resetTodayIfNeeded(sheets.statsSheet, scriptProperties, todayKey)

    return readStatsFromSheet(sheets.statsSheet)
  } finally {
    lock.releaseLock()
  }
}

function readStatsFromSheet(sheet) {
  const rows = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 3).getValues()
  const values = {}

  rows.forEach((row) => {
    values[row[0]] = row[1]
  })

  return {
    totalPageViews: toNumber(values[METRICS.totalPageViews]),
    uniqueVisitors: toNumber(values[METRICS.uniqueVisitors]),
    todayPageViews: toNumber(values[METRICS.todayPageViews]),
    todayUniqueVisitors: toNumber(values[METRICS.todayUniqueVisitors]),
    lastVisitAt: values[METRICS.lastVisitAt] || '',
  }
}

function writeStatsToSheet(sheet, stats, updatedAt) {
  writeMetric(sheet, METRICS.totalPageViews, stats.totalPageViews, updatedAt)
  writeMetric(sheet, METRICS.uniqueVisitors, stats.uniqueVisitors, updatedAt)
  writeMetric(sheet, METRICS.todayPageViews, stats.todayPageViews, updatedAt)
  writeMetric(sheet, METRICS.todayUniqueVisitors, stats.todayUniqueVisitors, updatedAt)
  writeMetric(sheet, METRICS.lastVisitAt, stats.lastVisitAt, updatedAt)
}

function writeMetric(sheet, metricName, value, updatedAt) {
  const row = findMetricRow(sheet, metricName)
  sheet.getRange(row, 2, 1, 2).setValues([[value, updatedAt.toISOString()]])
}

function findMetricRow(sheet, metricName) {
  const finder = sheet
    .getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1)
    .createTextFinder(metricName)
    .matchEntireCell(true)
    .findNext()

  if (!finder) {
    sheet.appendRow([metricName, 0, ''])
    return sheet.getLastRow()
  }

  return finder.getRow()
}

function appendVisitLog(sheet, visit) {
  sheet.appendRow([
    visit.timestamp.toISOString(),
    visit.visitorId,
    visit.pageUrl,
    visit.referrer,
    visit.userAgent,
    visit.visitDate,
    visit.isNewVisitor ? 'Yes' : 'No',
  ])
}

function createResponse(payload, callback) {
  const json = JSON.stringify(payload)
  const safeCallback = sanitizeCallback(callback)

  if (safeCallback) {
    return ContentService.createTextOutput(`${safeCallback}(${json});`).setMimeType(
      ContentService.MimeType.JAVASCRIPT,
    )
  }

  return ContentService.createTextOutput(json).setMimeType(
    ContentService.MimeType.JSON,
  )
}

function sanitizeCallback(callback) {
  if (!callback) {
    return ''
  }

  const value = String(callback)
  const validCallbackPattern = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/

  return validCallbackPattern.test(value) ? value : ''
}

function sanitizeValue(value, maxLength) {
  if (!value) {
    return ''
  }

  return String(value).slice(0, maxLength)
}

function toNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}
