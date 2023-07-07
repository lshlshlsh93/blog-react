import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getSessionCache,
  setSessionCache,
} from '../../utils/cache/sessionStorage'

const Archives = () => {
  const token = useSelector((state) => state.auth.token)
  const [total, setTotal] = useState(0)

  const data = getSessionCache('archives')

  console.log(data)

  const fetchData = () => {
    fetch('/api/v1/article/archives', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (response.code === 200) {
          setSessionCache('archives', response.data.list)
          setTotal(response.data.total)
        }
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchData()
  }, [token])

  return (
    <>
      <section
        style={{
          minHeight: '550px',
        }}
      >
        {/* {data &&
          data.map((v) => {
            console.log(v)
          })} */}
      </section>
    </>
  )
}

export default Archives
