import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getSessionCache, setSessionCache } from '../../utils'
import NoData from '../../components/NoData'
import { AiOutlineLike, AiOutlineRead } from 'react-icons/ai'
import { Dimmer, Loader } from 'semantic-ui-react'

const ArticleList = () => {
  const params = useParams()
  const { categoryId, categoryName } = params

  const token = useSelector((state) => state.auth.token)

  const [total, setTotal] = useState(0)

  const articles = getSessionCache('categoryArticle')

  const fetchData = async () => {
    const response = await fetch(
      `/api/v1/article/${categoryId}/${categoryName}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        data: { categoryId, categoryName },
      }
    )
    const data = await response.json()
    const categoryArticle = data.data.list
    console.log(data)
    setTotal(data.data.total)
    setSessionCache('categoryArticle', categoryArticle)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <section
        className="article"
        style={{
          minHeight: '550px',
        }}
      >
        <div style={{ margin: '35px' }}>
          <p
            style={{
              fontSize: '24px',
              fontWeight: '700',
            }}
          >
            当前分类： {categoryName}
          </p>
          <p>文章条数：{total} 个</p>
        </div>
        <div
          className="ui centered cards"
          style={{
            marginTop: '55px',
          }}
        >
          {articles &&
            articles.map((article) => {
              return (
                <div className="ui card" key={article.articleId}>
                  <div className="content">
                    <Link to={`/detail/${article.articleId}`}>
                      <div className="header">{article.title}</div>
                    </Link>
                    <div
                      className="meta"
                      style={{
                        marginTop: '10px',
                      }}
                    >
                      <AiOutlineRead />
                      <label>{article.readCount}</label>
                      <AiOutlineLike />
                      <label>{article.likeCount}</label>
                    </div>
                    <div className="description">
                      {article.articleSummary.slice(0, 30)}...
                    </div>
                  </div>
                </div>
              )
            })}
          {!articles && (
            <>
              <Dimmer active>
                <Loader indeterminate>加载信息中......</Loader>
              </Dimmer>
              {/* <NoData content="加载中......" /> */}
            </>
          )}
          {!articles && total === 0 && (
            <NoData
              color="black"
              content={`No article info for the category : ${categoryName}`}
            />
          )}
        </div>
      </section>
    </>
  )
}

export default ArticleList
