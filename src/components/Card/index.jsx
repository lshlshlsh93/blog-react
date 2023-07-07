import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dimmer, Icon, Loader, Pagination } from 'semantic-ui-react'
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineLike,
  AiOutlineRead,
} from 'react-icons/ai'

// import custom components
import NoData from '../NoData'

// import custom utils
import { setSessionCache, getSessionCache, getPageTotal } from '../../utils'

// import custom css
import styles from './card.module.css'

// import custom constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
} from '../../constants'

const Card = () => {
  // states
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [current, setCurrent] = useState(DEFAULT_CURRENT_PAGE)
  const [size, setSize] = useState(3)
  const [total, setTotal] = useState(DEFAULT_TOTAL)
  const token = useSelector((state) => state.auth.token)
  const totalPage = getPageTotal(size, total)

  const list = getSessionCache('articleList')

  /**
   * 页变化回调
   */
  const handlePageChange = (e, d) => {
    const currentPage = d.activePage
    fetchData(currentPage, size)
  }

  /**
   * 拉取数据
   * @param {*} current 当前页
   * @param {*} size 页大小
   */
  const fetchData = async (current, size) => {
    try {
      setIsError(false)
      setIsLoading(true)
      const response = await fetch(
        `/api/v1/article/findPage?current=${current}&size=${size}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const _d = await response.json()
      console.log(_d)
      if (_d.data.code === 401) {
        throw new Response(_d.data.msg, { status: 401 })
      }
      if (_d.data.data.rows) {
        const articleList = _d.data.data.rows
        setArticle(articleList)
        setTotal(_d.data.data.total)
        // 设置缓存信息
        setSessionCache('articleList', articleList)
      }
    } catch (error) {
      setIsError(true)
      console.error(`Error: ${error.message}`)
    }
    setIsError(false)
    setIsLoading(false)
  }
  // hooks funcs
  useEffect(() => {
    fetchData(current, size)
  }, [])

  return (
    <>
      <section
        className={styles.Blog}
        style={{ marginTop: '25px', minHeight: '610px' }}
      >
        <div className={`${styles.Container} grid1`}>
          {isError && <div>Something went wrong ... </div>}
          {/* <>
              <div>Loading...</div>
            </> */}
          {isLoading ? (
            <>
              <Dimmer active>
                <Loader indeterminate>加载文章信息中......</Loader>
              </Dimmer>
            </>
          ) : (
            <>
              {list &&
                list.map((item) => (
                  <div className="box boxItems" key={item.articleId}>
                    <div>
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <div className="detail">
                      <div className={styles.Tag}>
                        <AiOutlineTags />
                        <Link
                          to={{
                            pathname: `/articleList/${item.categoryId}/${item.categoryName}`,
                          }}
                        >
                          #{item.categoryName}
                        </Link>
                      </div>
                      <Link
                        to={`/detail/${item.articleId}`}
                        className={styles.Link}
                      >
                        <h3>{item.title}</h3>
                      </Link>
                      <p>{item.articleSummary.slice(0, 180)}...</p>
                    </div>
                    <div className={styles.Date}>
                      <AiOutlineClockCircle className={styles.Icon} />
                      <label>{item.createTime}</label>
                      <AiOutlineRead className={styles.Icon} />
                      <label>{item.readCount}</label>
                      <AiOutlineLike className={styles.Icon} />
                      <label>{item.likeCount}</label>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Pagination
            onPageChange={(e, d) => handlePageChange(e, d)}
            style={{
              marginTop: '20px',
              marginLeft: '20px',
            }}
            totalPages={totalPage}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true,
            }}
            siblingRange={2}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
            defaultActivePage={current}
          />
          <p style={{ marginTop: '15px' }}>total :{total}</p>
        </div>
        {!list && <NoData fontSize={'25px'} content={'当前没有热门文章信息'} />}
      </section>
    </>
  )
}

export default Card
