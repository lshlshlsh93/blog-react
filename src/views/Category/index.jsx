import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { getSessionCache, setSessionCache } from '../../utils'
import NoData from '../../components/NoData'

// import custom constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
} from '../../constants'

// import custom slice
import { saveCategory } from '../../store/slice'

// import custom styles
import styles from './category.module.css'
import { Link } from 'react-router-dom'

const CategoryPage = () => {
  const [current, setCurrent] = useState(DEFAULT_CURRENT_PAGE)
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE)
  const [total, setTotal] = useState(DEFAULT_TOTAL)

  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const category = getSessionCache('categoryList')

  const fetchData = async (current, size) => {
    try {
      const response = await fetch(`/api/v1/category/categoryList`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const _d = await response.json()
      console.log(_d)
      if (_d.code === 401) {
        throw new Response(_d.data.msg, { status: 401 })
      }
      if (_d.data.data) {
        const categoryList = _d.data.data
        dispatch(saveCategory(categoryList))
        setTotal(_d.data.total)
        // 设置缓存信息
        setSessionCache('categoryList', categoryList)
      }
    } catch (error) {
      console.error(`Error: ${error.message}`)
    }
  }
  useEffect(() => {
    fetchData(current, size)
  }, [])
  return (
    <>
      <section className={styles.CategorySection}>
        <div className={`${styles.CategoryContainer} ui compact menu`}>
          {category &&
            category.map((c) => {
              return (
                <Link
                  to={{
                    pathname: `/articleList/${c.categoryId}/${c.categoryName}`,
                  }}
                  className={`${styles.Item} item`}
                  key={c.categoryId}
                >
                  {c.categoryName}
                </Link>
              )
            })}
          {!category && <NoData />}
        </div>
      </section>
    </>
  )
}

export default CategoryPage
