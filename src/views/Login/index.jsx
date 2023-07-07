import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Icon, Input } from 'semantic-ui-react'

// import custom slice
import { setLogin, setUserInfo } from '../../store/slice'

// import custom utils
import { isValidEmail, isValidPassword } from '../../utils'

// custom styles
import styles from './login.module.css'

import { SUCCESS_CODE, VISITED_TOO_FREQUENTLY_ERROR } from '../../constants'

function Login() {
  // state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isloading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // func
  const submitHandler = async (e) => {
    e.preventDefault()
    let email = e.target[0].value
    let password = e.target[1].value
    await login({ email, password })
  }

  const login = async ({ email, password }) => {
    if (!isValidEmail(email)) {
      toast.error('请输入合法的邮箱地址')
      return
    }
    if (!isValidPassword(password, 6, 16)) {
      toast.error('密码长度在6-16个字符内')
      return
    }
    setIsLoading(false)
    try {
      // 发起请求
      const loggedInResponse = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      // 返回码为504显示错误提示消息
      if (!loggedInResponse.ok && loggedInResponse.status === 504) {
        toast.error('后端接口异常', {
          theme: 'light',
        })
      } else {
        const loggedIn = await loggedInResponse.json()
        console.log(loggedIn)

        if (loggedIn.code === VISITED_TOO_FREQUENTLY_ERROR) {
          toast.error(loggedIn.message, {
            theme: 'light',
          })
          return
        }
        // 返回码为-206显示错误提示消息
        if (loggedIn.code === -206) {
          toast.error(loggedIn.message, {
            theme: 'light',
          })
        }

        // 返回码为401显示错误提示消息
        if (loggedIn.data.code === 401 && loggedIn.data.msg !== '') {
          toast.error(loggedIn.data.msg, {
            position: 'top-center',
            theme: 'light',
          })
        }

        if (loggedIn.code === SUCCESS_CODE) {
          // dispatch a login action
          dispatch(
            setLogin({
              // user: loggedIn.data.user.userInfo,
              token: loggedIn.data.user.token,
              userId: loggedIn.data.user.userInfo.userId,
            })
          )
          dispatch(setUserInfo({ user: loggedIn.data.user.userInfo }))
          setIsLoading(false)
          // 跳转到首页并传递state参数
          navigate('/home', {
            state: {
              hasToken: true,
            },
            replace: true,
          })
        }
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  window.addEventListener('popstate', function () {
    window.history.pushState(null, null, document.URL)
  })

  return (
    <>
      <div className={styles.Login}>
        {/* form */}
        <form className={styles.LoginForm} onSubmit={submitHandler}>
          <Input
            className="sm-mg-t"
            iconPosition="left"
            placeholder="email"
            onChange={(e, d) => setEmail(e.target.value)}
          >
            <Icon name="at" />
            <input
              required
              type="email"
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </Input>
          <Input
            className="sm-mg-t"
            iconPosition="left"
            placeholder="password"
            onChange={(e, d) => setPassword(e.target.value)}
          >
            <Icon name="star half empty" />
            <input
              required
              type="password"
              onContextMenu={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            />
          </Input>
          <div className="sm-mg-t">
            <Button color="facebook" fluid loading={isloading}>
              登录
            </Button>
          </div>
          {/* 底部区域开始 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span
              className="sm-mg-t"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <p>还没有账户?&nbsp;</p>
              <Link to="/register">
                <p>去注册</p>
              </Link>
            </span>
            <Link to="/user/password/forget">
              <span
                className="sm-mg-t"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <p>忘记密码？</p>
              </span>
            </Link>
          </div>
          {/* 底部区域结束*/}
        </form>
      </div>
    </>
  )
}

export default Login
