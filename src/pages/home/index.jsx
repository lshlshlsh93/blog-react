// custom components
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import Posts from '../posts'

// custom styles
import styles from './home.module.css'

function Home(props) {
  return (
    <>
      <Header />
      <div className={styles.Home}>
        <Posts />
        <SideBar />
      </div>
    </>
  )
}

export default Home
