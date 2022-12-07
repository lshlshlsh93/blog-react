// custom config
import { DEFAULT_IMG_URL } from '../../config'

// custom styles
import styles from './sideBar.module.css'
function SideBar() {
  return (
    <div className={styles.SideBar}>
      {/* About me */}

      <div className={styles.SideBarItem}>
        <span className={styles.SideBarTitle}>About me</span>
        <img className={styles.SideBarImg} src={DEFAULT_IMG_URL} alt="" />
        <p>
          Apparently we had reached a great height in the atmosphere, for the
          sky was a dead black, and the stars had ceased to twinkle. I could see
          a ruddy light streaming through a rift in the clouds.
        </p>
      </div>
      {/* Category */}
      <div className={styles.SideBarItem}>
        <span className={styles.SideBarTitle}>Category</span>
        <ul className={styles.SideBarList}>
          <li className={styles.SidebarListItem}>Life</li>
          <li className={styles.SidebarListItem}>Music</li>
          <li className={styles.SidebarListItem}>Sleep</li>
          <li className={styles.SidebarListItem}>Sport</li>
          <li className={styles.SidebarListItem}>Study</li>
          <li className={styles.SidebarListItem}>Thinking</li>
        </ul>
      </div>
      {/* Follow us */}
      <div className={styles.SideBarItem}>
        <span className={styles.SideBarTitle}>Follow us</span>
        <div className={styles.SideBarSocial}>
          <i className={`${styles.SideBarIcon} fa-brands fa-square-facebook`} />
          <i className={`${styles.SideBarIcon} fa-brands fa-weibo`} />
          <i className={`${styles.SideBarIcon} fa-brands fa-qq`} />
          <i className={`${styles.SideBarIcon} fa-brands fa-weixin`} />
        </div>
      </div>
    </div>
  )
}

export default SideBar
