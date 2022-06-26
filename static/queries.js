import { projectId, datasetId, tableId } from '../static/config.js'

const table = `${projectId}.${datasetId}.${tableId}`

const dailyStatsQuery =
    `
SELECT
    FORMAT_DATETIME("%d/%m/%Y", active_users.date) AS date,
    CAST(sessions.average_session_duration AS INT64) AS average_session_duration,
    active_users.active_user_count,
    new_users.new_user_count
FROM (
  SELECT
    COUNT(DISTINCT user_id) AS active_user_count,
    EXTRACT(DATE FROM event_time) AS date
  FROM
    ${table}
  GROUP BY
    date) AS active_users
JOIN (
  SELECT
    DISTINCT(date),
    AVG(session_duration) OVER(PARTITION BY date) AS average_session_duration
  FROM (
    SELECT
      EXTRACT(DATE FROM event_time) AS date,
      TIMESTAMP_DIFF(MAX(event_time), MIN(event_time), SECOND) AS session_duration
    FROM
    ${table}
    GROUP BY
      date,
      session_id)) AS sessions
ON
  active_users.date = sessions.date
LEFT JOIN (
  SELECT
    news.user_date,
    COUNT(news.user_date) AS new_user_count
  FROM (
    SELECT
      EXTRACT (DATE FROM MIN(event_time)) AS user_date,
    FROM
    ${table}
    GROUP BY
      user_id) AS news
  GROUP BY
    news.user_date) AS new_users
ON
  active_users.date = new_users.user_date
  ORDER BY active_users.date
`

const totalUsersQuery = `SELECT COUNT(DISTINCT user_id) as total_users FROM ${table} WHERE user_id IS NOT NULL`


export { dailyStatsQuery, totalUsersQuery }