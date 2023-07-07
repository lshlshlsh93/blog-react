import { useEffect, useState } from 'react'

export const useFetch = (
  url,
  initialMethodType = 'GET',
  InitialHeaders,
  initalBody
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchDataAction = () => {
      const controller = new AbortController()
      setLoading(true)
      fetch(url, {
        method: initialMethodType,
        headers: InitialHeaders,
        body: initalBody,
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((response) => setData(response.data))
        .catch((err) => {
          if (err.name === 'AbortError') {
            setError('Fetch Aborted!!!')
          } else {
            setError(err.message)
          }
        })
        .finally(() => setLoading(false))
      return () => {
        controller.abort()
      }
    }
    fetchDataAction()
  }, [])
  return [loading, data, error]
}
