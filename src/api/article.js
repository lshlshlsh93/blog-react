import { useEffect } from 'react'

const useFetch = (url, token = null, data = null) => {
  const method = data === null ? 'GET' : 'POST'
  const fetchData = async () => {
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  }
  useEffect(() => {
    fetchData()
  }, [])
}

export { useFetch }
