// custom config
import { DEFAULT_IMG_URL } from '../../config'

// custom styles
import styles from './header.module.css'
function Header(props) {
  return (
    <div className={styles.Header}>
      {/* title */}
      <div className={styles.HeaderTitle}>
        {/* line1 */}
        <span className={styles.HeaderTitleSm}>React & Node</span>
        {/* line2 */}
        <span className={styles.HeaderTitleLg}>Blog</span>
      </div>
      {/* image */}
      <img className={styles.HeaderImg} src={DEFAULT_IMG_URL} alt="" />
    </div>
  )
}

export default Header
