import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Dropdown } from 'semantic-ui-react'

// import custom styles
import styles from './profile.module.css'

// actions
import { setLogout } from '../../store/slice'

const Profile = () => {
  // vars
  const url =
    'https://images.pexels.com/photos/15386480/pexels-photo-15386480.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const userId = useSelector((state) => state.auth.userId)

  // funs
  /**
   * 退出登录
   */
  const handleLogout = () => {
    // todo 清除登录信息
    dispatch(setLogout())
    navigate('/login')
    toast.success('logout success', {
      position: 'top-center',
      theme: 'light',
    })
  }
  const trigger = (
    <span>
      <img src={url} className="ui avatar image" />
    </span>
  )
  return (
    <>
      <div className={styles.Profile}>
        {user ? (
          <>
            <div>
              <Dropdown trigger={trigger} direction="left">
                <Dropdown.Menu className={styles.Menu}>
                  <Dropdown.Item
                    className={styles.MenuItem}
                    content={'个人资料'}
                    icon="user outline"
                    onClick={() => navigate(`/account/${userId}`)}
                  />
                  <Dropdown.Item
                    className={styles.MenuItem}
                    content={'写文章'}
                    icon="add"
                    onClick={() => navigate(`/create`, { state: { blog: {} } })}
                  />
                  <Dropdown.Item
                    className={styles.MenuItem}
                    content={'找回密码'}
                    icon="find"
                    onClick={() => navigate(`/user/password/forget`)}
                  />
                  <Dropdown.Item
                    className={styles.MenuItem}
                    content={'关于'}
                    icon="info"
                    onClick={() => navigate('/about')}
                  />
                  <Dropdown.Item
                    className={styles.MenuItem}
                    content={'退出登录'}
                    icon="sign-out"
                    onClick={handleLogout}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </>
  )
}

export default Profile
