'use strict'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Input, Image, Button, Modal } from 'semantic-ui-react'
import Editor from 'for-editor'

// impost custom components
import Dropdown from '../../components/Dropdown'
// import custom styles
import styles from './create.module.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Create = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const blogData = location.state.blog
  console.log(blogData)
  const token = useSelector((state) => state.auth.token)

  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    blogData ? blogData.thumbnail : ''
  )
  const [title, setTitle] = useState(blogData ? blogData.title : '')
  const [articleSummary, setArticleSummary] = useState(
    blogData ? blogData.articleSummary : ''
  )
  const [content, setContent] = useState(blogData ? blogData.content : '')
  const [selectedCategory, setSelectedCategory] = React.useState(
    blogData ? blogData.categoryName : ''
  )
  const [showImg, setShowImg] = useState('block')

  const [open, setOpen] = React.useState(false)
  const [isCategoryLoading, setIsCategoryLoading] = React.useState(true)
  const [category, setCategory] = React.useState([])

  /**
   * 处理图片上传
   * @param {*} e
   */
  const handleImageChange = (e) => {
    e.preventDefault()
    if (e.target.files.length === 0) return false
    var reader = new FileReader()
    var file = e.target.files[0]
    if (!/^image\//.test(file.type)) {
      alert(`文件 ${file.name} 不是一个有效的图片文件哦~.`)
      return
    }
    reader.onload = () => {
      let imgBase64 = reader.result
      setFile(file)
      setImagePreviewUrl(imgBase64)
    }
    reader.readAsDataURL(file)
  }

  /**
   * 更新文章信息回调
   * @param {*} e
   */
  const handleUpdateSubmitFunc = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('id', blogData.articleId)
    formData.append('img', file)
    formData.append('title', title)
    formData.append('articleSummary', articleSummary)
    formData.append('selectedCategory', selectedCategory)
    formData.append('content', content)
    fetch('/api/v1/article/update', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message)
        navigate('/home')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**
   * 创建文章信息回调
   * @param {*} e
   */
  const handleCreate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('img', file)
    formData.append('title', title)
    formData.append('articleSummary', articleSummary)
    formData.append('selectedCategory', selectedCategory)
    formData.append('content', content)
    fetch('/api/v1/article/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        if (response.code === 200) {
          setImagePreviewUrl(response.url)
          toast.success(response.message)
          navigate('/home')
        }
      })
  }

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch('/api/v1/category/categoryList', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      console.log(data)
      const category = data.data.data
      setCategory(category)
      setIsCategoryLoading(false)
    }
    fetchCategory()
  }, [token])

  function handleImageViewFullScreen() {}
  return (
    <>
      {blogData !== null ? (
        <section className={styles.NewPost}>
          <div className={`${styles.Container} boxItems`}>
            <form onSubmit={handleUpdateSubmitFunc}>
              {/* 上传图片区域 */}
              <div className={styles.InputFile}>
                {imagePreviewUrl !== '' ? (
                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                      <img
                        src={imagePreviewUrl}
                        alt="preview"
                        onClick={handleImageViewFullScreen}
                      />
                    }
                  >
                    <Modal.Content image>
                      <Image src={imagePreviewUrl} fluid centered />
                    </Modal.Content>
                  </Modal>
                ) : (
                  <input
                    type="file"
                    name="file"
                    style={{ display: showImg }}
                    accpet="image/gif,image/png,image/jpeg,image/jpg,image/bmp"
                    onChange={(e) => handleImageChange(e)}
                  />
                )}
              </div>

              {/* 第一行开始 */}
              {/* <div className="grid2"> */}
              {/* 文章标题 */}
              <Input
                className="sm-mg-t"
                placeholder="Title"
                size="mini"
                onChange={(e, d) => setTitle(e.target.value)}
              >
                <input
                  required
                  type="text"
                  defaultValue={title}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Input>
              {/* 文章概要 */}
              <Input
                className="sm-mg-t"
                placeholder="ArticleSummary"
                onChange={(e, d) => setArticleSummary(e.target.value)}
              >
                <input
                  required
                  type="text"
                  defaultValue={articleSummary}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Input>
              {/* </div> */}
              {/* 第一行结束*/}
              <div className="grid2">
                <Dropdown
                  options={category}
                  selected={selectedCategory}
                  setSelected={setSelectedCategory}
                />
              </div>
              {/* 文章内容 */}
              <div
                style={{
                  paddingTop: '15px',
                }}
              >
                <Editor
                  style={{
                    paddingTop: '15px',
                    overflow: 'auto',
                  }}
                  value={content}
                  onChange={(newVal) => setContent(newVal)}
                />
              </div>
              {/* 按钮 */}
              <div className="sm-mg-t">
                <Button color="facebook" fluid>
                  更新
                </Button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <section className={styles.NewPost}>
          <div className={`${styles.Container} boxItems`}>
            <form>
              {/* 上传图片区域 */}
              <div className={styles.InputFile}>
                {imagePreviewUrl ? (
                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<img src={imagePreviewUrl} alt="preview" />}
                  >
                    <Modal.Content image>
                      <Image src={imagePreviewUrl} centered />
                    </Modal.Content>
                  </Modal>
                ) : (
                  <input
                    type="file"
                    name="file"
                    style={{ display: showImg }}
                    accpet="image/gif,image/png,image/jpeg,image/jpg,image/bmp"
                    onChange={(e) => handleImageChange(e)}
                  />
                )}
              </div>
              <Input
                className="sm-mg-t"
                placeholder="Title"
                onChange={(e, d) => setTitle(e.target.value.trim())}
              >
                <input
                  required
                  type="text"
                  defaultValue={title}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Input>

              {/* 文章概要 */}
              <Input
                className="sm-mg-t"
                placeholder="ArticleSummary"
                onChange={(e, d) => setArticleSummary(e.target.value)}
              >
                <input
                  required
                  type="text"
                  defaultValue={articleSummary}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Input>
              <div>
                <Dropdown
                  placeholder="请选择分类"
                  options={category}
                  selected={selectedCategory}
                  setSelected={setSelectedCategory}
                />
              </div>
              {/* 文章内容 */}
              <div
                style={{
                  paddingTop: '15px',
                }}
              >
                <Editor
                  style={{
                    paddingTop: '15px',
                  }}
                  subfield={true}
                  value={content}
                  onChange={(newVal) => setContent(newVal)}
                />
              </div>
              <div className="sm-mg-t">
                <Button color="facebook" fluid onClick={handleCreate}>
                  创建
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default Create
