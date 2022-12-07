import React from 'react'
import PropTypes from 'prop-types'

// custom styles
import styles from './topBar.module.css'
const TopBar = (props) => {
  return (
    <div className={styles.Top}>
      {/* left */}
      <div className={styles.TopLeft}>
        <i className={`${styles.TopIcon} fa-brands fa-square-facebook`}></i>
        <i className={`${styles.TopIcon} fa-brands fa-weibo`}></i>
        <i className={`${styles.TopIcon} fa-brands fa-qq`}></i>
        <i className={`${styles.TopIcon} fa-brands fa-weixin`}></i>
      </div>
      {/* center */}
      <div className={styles.TopCenter}>
        <ul className={styles.TopList}>
          <li className={styles.TopListItem}>HOME</li>
          <li className={styles.TopListItem}>CATEGORY</li>
          <li className={styles.TopListItem}>TAG</li>
          <li className={styles.TopListItem}>ABOUT</li>
          <li className={styles.TopListItem}>CONTACT</li>
        </ul>
      </div>
      {/* right */}
      <div className={styles.TopRight}>
        <img
          className={styles.Avatar}
          src="https://lsh-images.oss-cn-hangzhou.aliyuncs.com/common-images/c5398839880411ebb6edd017c2d2eca2.jpg"
          alt=""
        />
        <i
          className={` ${styles.TopSearchIcon} fa-solid fa-magnifying-glass`}
        ></i>
      </div>
    </div>
  )
}

TopBar.propTypes = {}

export default TopBar
