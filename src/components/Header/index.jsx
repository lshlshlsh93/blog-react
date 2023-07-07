// import custom components
import Profile from '../Profile'
import Nav from '../Nav'
import Logo from '../Logo'

// import custom styles
import styles from './header.module.css'

const Header = () => {
  window.addEventListener('scroll', function () {
    const header = this.document.querySelector('.header')
    if (header?.classList != null) {
      header.classList.toggle('active', this.window.scrollY > 100)
    }
  })

  return (
    <>
      <header className="header">
        <div className="flexBetween">
          {/* logo区域 */}
          <Logo />
          {/* nav区域 */}
          <Nav />
          {/* account区域 */}
          <Profile />
        </div>
      </header>
    </>
  )
}

export default Header
