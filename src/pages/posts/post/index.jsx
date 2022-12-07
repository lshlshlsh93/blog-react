// custom config
import { DEFAULT_IMG_URL } from '../../../config'

// custom styles
import styles from './post.module.css'
function Post(props) {
  return (
    <div className={styles.Post}>
      {/* img */}
      <img className={styles.PostImg} src={DEFAULT_IMG_URL} alt="" />
      {/* info */}
      <div className={styles.PostInfo}>
        {/* categorys */}
        <div className={styles.PostCategorys}>
          <span className={styles.PostCategory}>Music</span>
          <span className={styles.PostCategory}>Life</span>
        </div>
        {/* title */}
        <span className={styles.PostTitle}>
          Apparently we had reached a great height in the atmosphere
        </span>
        <hr />
        {/* date */}
        <span className="PostDate">1 hour ago</span>
      </div>
      {/* content */}
      <p className={styles.PostDesc}>
        Apparently we had reached a great height in the atmosphere, for the sky
        was a dead black, and the stars had ceased to twinkle. By the same
        illusion which lifts the horizon of the sea to the level of the
        spectator on a hillside, the sable cloud beneath was dished out, and the
        car seemed to float in the middle of an immense dark sphere, whose upper
        half was strewn with silver. Looking down into the dark gulf below, I
        could see a ruddy light streaming through a rift in the clouds.
        Apparently we had reached a great height in the atmosphere, for the sky
        was a dead black, and the stars had ceased to twinkle. By the same
        illusion which lifts the horizon of the sea to the level of the
        spectator on a hillside, the sable cloud beneath was dished out, and the
        car seemed to float in the middle of an immense dark sphere, whose upper
        half was strewn with silver. Looking down into the dark gulf below, I
        could see a ruddy light streaming through a rift in the clouds.
        Apparently we had reached a great height in the atmosphere, for the sky
        was a dead black, and the stars had ceased to twinkle. By the same
        illusion which lifts the horizon of the sea to the level of the
        spectator on a hillside, the sable cloud beneath was dished out, and the
        car seemed to float in the middle of an immense dark sphere, whose upper
        half was strewn with silver. Looking down into the dark gulf below, I
        could see a ruddy light streaming through a rift in the clouds.
      </p>
    </div>
  )
}

export default Post
