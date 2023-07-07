import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Card, Icon, Grid, Pagination } from 'semantic-ui-react'

// import custom constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
} from '../../constants'

// import components
import NoData from '../../components/NoData'

import styles from './tag.module.css'

import { getPageTotal, getSessionCache, setSessionCache } from '../../utils'

const Tag = () => {
  const [current, setCurrent] = useState(DEFAULT_CURRENT_PAGE)
  const [size, setSize] = useState(4)
  const [total, setTotal] = useState(DEFAULT_TOTAL)
  const [data, setData] = useState(null)

  const token = useSelector((state) => state.auth.token)
  const totalPage = getPageTotal(size, total)

  // caches
  const list = getSessionCache('tagList')
  // console.log(list)

  function handleClick(e, d) {
    const currentPage = d.activePage
    fetchData(currentPage, size)
    // console.log(e, d)
  }

  /**
   * 点击tag按钮触发的回调函数
   */
  function handleTagClick() {
    console.log('click tag')
  }

  const fetchData = async (current, size) => {
    try {
      const response = await fetch(
        `/api/v1/tag/findPage?current=${current}&size=${size}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const _d = await response.json()
      console.log(_d)
      if (_d.data === 401) {
        throw new Response(_d.data.msg, { status: 401 })
      }
      if (_d.data.data) {
        const tagList = _d.data.data
        setData(tagList)
        setTotal(_d.data.total)
        // 设置缓存信息
        setSessionCache('tagList', tagList)
      }
    } catch (error) {
      console.error(`Error: ${error.message}`)
    }
  }
  // hooks funcs
  useEffect(() => {
    fetchData(current, size)
  }, [])
  return (
    <>
      <section className={styles.Section}>
        <div className={styles.Grid}>
          <Grid relaxed columns={3} stackable stretched>
            {data &&
              data.map((t) => {
                return (
                  <Grid.Column key={t.tagId} mobile={2}>
                    <Card.Group>
                      <Card centered color="red" onClick={handleTagClick}>
                        <Card.Content header={t.tagName} />
                        <Card.Content description={t.tagDesc.slice(0, 20)} />
                        <Card.Content extra>
                          <Icon name="time" />
                          {t.createTime.slice(0, 11)}
                        </Card.Content>
                      </Card>
                    </Card.Group>
                  </Grid.Column>
                )
              })}
            {!data && <NoData fontSize="24px" color="red" height="450px" />}
          </Grid>
        </div>
        <div
          style={{
            flexDirection: 'column',
          }}
          className="flexCenter"
        >
          <Pagination
            onPageChange={(e, d) => handleClick(e, d)}
            totalPages={totalPage}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true,
            }}
            siblingRange={4}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
            defaultActivePage={current}
          />
          <p style={{ marginTop: '10px' }}>total :{total}</p>
        </div>
      </section>
    </>
  )
}

export default Tag
