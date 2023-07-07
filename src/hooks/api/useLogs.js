import { useState, useEffect } from 'react'

export const useLogs = (url, token) => {
  const [logs, setLogs] = useState([])

  useEffect(() => {}, [logs])
  return [logs, useLogs]
}
