import React from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const NewPost = () => {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  }
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]
  const createNewPost = (ev) => {
    ev.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    console.log(files)
    data.set('file', files[0])
    fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      body: data,
    })
  }
  return (
    <section
      style={{
        minHeight: '530px',
      }}
    >
      <form style={{ height: '1500px' }} onSubmit={createNewPost}>
        <input
          type="title"
          placeholder={'title'}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder={'Summary'}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          type="file"
          value={files}
          onChange={(ev) => {
            setFiles(ev.target.files)
          }}
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(newVal) => setContent(newVal)}
          modules={modules}
          formats={formats}
        />
      </form>
    </section>
  )
}

export default NewPost
