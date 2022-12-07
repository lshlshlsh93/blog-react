// custom components
import Post from './post'

// custom styles
import styles from './posts.module.css'
function Posts(props) {
  return (
    <div className={styles.Posts}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />

      <Post />
    </div>
  )
}

export default Posts
