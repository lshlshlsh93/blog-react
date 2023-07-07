import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const usePageQuery = (
  initialCurrent = 1,
  initialSize = 5,
  url,
  token
) => {
  const [current, setCurrent] = useState(initialCurrent)
  const [size, setSize] = useState(initialSize)
  const [data, setData] = useState(null)
  const [total, setTotal] = useState(0)

  /**
   * 页码变化回调
   * @param {*} newPage 新页码
   */
  const handleCurrentChange = (newPage) => {
    setCurrent(newPage)
  }
  /**
   * 页大小回调
   * @param newSize 新页大小
   */
  const handleSizeChange = (newSize) => {
    setSize(newSize)
  }

  useEffect(() => {
    const fetchData = async () => {
      let _u = url + `?current=${current}&size=${size}`
      const response = await fetch(_u, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        toast.error(response.statusText, {
          position: 'top-center',
          theme: 'light',
        })
      }
      const d = await response.json()
      setData(d.data.data)
      setTotal(d.data.total)
    }
    fetchData()
  }, [current, size])

  return [data, current, size, total, handleCurrentChange, handleSizeChange]
}
