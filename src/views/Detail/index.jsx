import { useEffect, useState, createRef } from 'react'
import { AiOutlineDelete, AiOutlineTags } from 'react-icons/ai'
import { CiRead } from 'react-icons/ci'
import { BsPencilSquare } from 'react-icons/bs'
import { BiLike, BiTime } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Dimmer, Icon, Image, Loader, Modal } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown' // 解析 markdown
import remarkGfm from 'remark-gfm' // markdown 对表格/删除线/脚注等的支持
import MarkNav from 'markdown-navbar' // markdown 目录
import 'markdown-navbar/dist/navbar.css'

// import 'https://unpkg.com/github-markdown-css@5.0.0/github-markdown.css'

import NoData from '../../components/NoData'

// import custom constants
import { UPDATE_ACION } from '../../constants'

// import custom styles
import styles from './detail.module.css'

const Detail = () => {
  // states
  const [blog, setBlog] = useState(null)
  const [open, setOpen] = useState(false)
  const [openImag, setOpenImag] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  /**
   * 根据博客id查询博客信息
   */
  const fetchData = () => {
    fetch(`/api/v1/article/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((d) => {
        console.log(d)
        if (d.code === 200 && d.data.articleDetail) {
          setBlog(d.data.articleDetail)
        }
      })
      .then(() => {
        /**
         * 更新文章浏览量
         */
        fetch(`/api/v1/article/updateViewCount/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  /**
   * 删除文章
   */
  const handleDelete = async () => {
    setOpen(false)
    const response = await fetch(`/api/v1/article/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await response.json()
    if (result.code === 200 && result.message === '删除成功') {
      navigate('/home')
      toast.success(result.message)
    }
  }

  // return component
  return (
    <>
      {blog ? (
        <section
          className={styles.SinglePost}
          style={{
            minHeight: '620px',
          }}
        >
          <div className={styles.Container}>
            {/* 中间部分 */}
            <div className={styles.Center}>
              {/* 标题 */}
              <h1 className="flexCenter">{blog.title}</h1>
              {/* 第一行开始 */}
              <div className={`${styles.IconInfo}`}>
                <div className={`${styles.Icons} flexCenter`}>
                  <span>
                    <AiOutlineTags /> {blog.categoryName}
                  </span>
                  {/* 图标开始 */}
                  <div className={styles.IconWrap}>
                    <div className={styles.Icon}>
                      {/* 点赞量 */}
                      <span>
                        <BiLike />
                        {blog.likeCount}
                      </span>
                      {/* 阅读量 */}
                      <span>
                        <CiRead />
                        {blog.readCount}
                      </span>
                      {/* 创建时间 */}
                      <span style={{ marginTop: '20px', marginRight: '10px' }}>
                        <BiTime /> {blog.createTime}
                      </span>
                      {/* 编辑 */}
                      <span>
                        <Link
                          style={{
                            color: 'black',
                            marginLeft: '10px',
                            fontSize: '15px',
                          }}
                          to={{
                            pathname: '/create',
                          }}
                          state={{ blog: blog, type: UPDATE_ACION }}
                        >
                          <BsPencilSquare />
                        </Link>
                      </span>
                      <span>
                        {/* 删除对话框开始 */}
                        <Modal
                          open={open}
                          // basic
                          onClose={() => setOpen(false)}
                          onOpen={() => setOpen(true)}
                          size="small"
                          trigger={
                            <AiOutlineDelete
                              style={{
                                cursor: 'pointer',
                                color: 'black',
                                fontSize: '15px',
                              }}
                            />
                          }
                        >
                          <Modal.Content>
                            <p>确认要删除吗?</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              basic
                              color="red"
                              onClick={() => setOpen(false)}
                            >
                              <Icon name="remove" /> 否
                            </Button>
                            <Button
                              color="green"
                              onClick={() => handleDelete()}
                            >
                              <Icon name="checkmark" /> 是
                            </Button>
                          </Modal.Actions>
                        </Modal>
                        {/* 删除对话框结束 */}
                      </span>
                    </div>
                  </div>
                  {/* 图标结束 */}
                </div>
              </div>
              {/* 第一行结束 */}
              {/* 上边图片 */}
              <div className={styles.Thumbnail}>
                <Modal
                  onClose={() => setOpenImag(false)}
                  onOpen={() => setOpenImag(true)}
                  open={openImag}
                  trigger={<img src={blog.thumbnail} alt="preview" />}
                >
                  <Modal.Content image>
                    <Image src={blog.thumbnail} fluid centered />
                  </Modal.Content>
                </Modal>
              </div>
              {/* 内容开始 */}
              <div className={styles.ContentContainer}>
                <div className={styles.Content}>
                  <ReactMarkdown
                    children={blog.content}
                    remarkPlugins={[remarkGfm]}
                  />
                </div>
                <div className={styles.Nav}>
                  <MarkNav source={blog.content} ordered={true} />
                </div>
              </div>
              {/* 内容结束 */}
            </div>
          </div>
        </section>
      ) : (
        <>
          <Dimmer active>
            <Loader indeterminate>加载文章信息中......</Loader>
          </Dimmer>
          {/* <NoData content="加载中......" /> */}
        </>
      )}
    </>
  )
}

export default Detail
