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
      <img
        className={styles.HeaderImg}
        src="https://lsh-images.oss-cn-hangzhou.aliyuncs.com/common-images/c5398839880411ebb6edd017c2d2eca2.jpg"
        alt=""
      />
    </div>
  )
}

export default Header
