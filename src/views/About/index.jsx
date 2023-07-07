import { GoMarkGithub } from 'react-icons/go'
import { RiQqFill, RiWechatFill, RiWeiboFill } from 'react-icons/ri'
import { Popup } from 'semantic-ui-react'
import { LOGIN_BACKGROUND_CDN_URL } from '../../constants/common/cdnConstants'
import styles from './about.module.css'

const About = () => {
  return (
    <section style={{ minHeight: '520px' }}>
      <div className={`${styles.Container} flexCenter`}>
        <div className={`${styles.Content} boxItems`}>
          <div className={`${styles.Image} flexCenter`}>
            <img src={LOGIN_BACKGROUND_CDN_URL} alt="" />
          </div>
          {/* 关于我区域开始 */}
          <div className={styles.AboutContainer}>
            <div className={styles.TitleWrap}>
              <h1 className={styles.Title}>关于我</h1>
            </div>
            <div className={`${styles.Intro}`}>
              <p>很开心遇见你！我是阿辉，一位热爱生活的互联网打工人。</p>
              <p>虽然是社恐，但很喜欢交朋友。欢迎发邮件给我。</p>
              <p>生活会带我去向哪里？我很期待！</p>
            </div>
          </div>
          {/* 关于我区域结束 */}
          {/* 联系我区域开始 */}
          <div className={styles.AboutContainer}>
            <div className={styles.TitleWrap}>
              <h1>联系我</h1>
            </div>
            <div className={styles.ContactWrapper}>
              <a target="_blank" href="https://github.com/lshlshlsh93">
                <GoMarkGithub className={styles.ContactIcon} />
              </a>
              <div></div>
            </div>
          </div>
          {/* 联系我区域结束 */}
        </div>
      </div>
    </section>
  )
}

export default About
