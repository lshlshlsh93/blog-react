'use strict'
import React, { Component } from 'react'
import { toast } from 'react-toastify'

import styles from './uploadFile.module.css'
import { _throttle, fileToBase64 } from '../../utils'
class UploadFile extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    base64Url: '', // base64 url
    imgUrl: '', // 后端回显的图片url
  }
  // 上传图片(_throttle:防连点)
  uploadFile = _throttle(async (event) => {
    event.persist() // 解决react异步访问或者打印event时，显示的属性值均是null值
    console.log('事件池', event)
    const files = [...event.target.files]
    if (files.length === 0) return
    if (files.length > 1) {
      toast.warn('只可上传一张图片哦~')
      return
    }
    if (files[0].size > 5 * 1024 * 1024) {
      toast.warn('图片大小不可超过5MB哦~')
      return
    }

    const res = await fileToBase64(files[0])
    console.log('上传图片的base64', res)
    this.setState({ base64Url: res })

    const formdata = new FormData()
    formdata.append('file', this.base64Url)
    fetch('/api/v1/aliyun/upload', {
      method: 'POST',
      body: formdata,
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        const percent = Math.floor((loaded / total) * 100)
        this.setState({ progress: percent })
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // this.setState({ imgUrl: data.imgUrl })
      })
      .catch((error) => {
        console.error(error)
      })
  })

  render() {
    const { base64Url, imgUrl } = this.state
    console.log('上传图片的base64: ', base64Url)
    console.log('后端回显的url:   ', imgUrl)
    return (
      <>
        <div className={styles.Container}>
          <div className={styles.UploadArea}>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              ref={this.FileInputEl}
              onChange={(e) => this.uploadFile(e)}
            />
          </div>
          <div className={styles.ImgShowArea}>
            {(imgUrl !== '' || base64Url != '') && (
              <img src={imgUrl !== '' ? imgUrl : base64Url} alt=".." />
            )}
          </div>
        </div>
      </>
    )
  }
}

export default UploadFile
