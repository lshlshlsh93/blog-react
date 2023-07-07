import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Icon, Input } from 'semantic-ui-react'

// import custom constants
import {
  SUCCESS_CODE,
  NO_REGISTER_ERROR,
  VISITED_TOO_FREQUENTLY_ERROR,
} from '../../constants'

// import custom styles
import styles from './forgetPassword.module.css'
import { isValidEmail } from '../../utils'
import { useSelector } from 'react-redux'

// component
const ForgetPassword = () => {
  const navigate = useNavigate()

  const token = useSelector((state) => state.auth.token)
  console.log(token)

  // states
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // cbs
  /**
   * 点击发送邮件的回调函数
   */
  const handleSubmit = async (e) => {
    // 阻止表单默认提交
    e.preventDefault()
    if (!isValidEmail(email)) {
      toast.error('请输入合法的邮箱地址', {
        position: 'top-center',
      })
      return
    }
    if (email === '') return
    // 设置为加载中状态
    setLoading(true)
    let url = `/api/v1/user/sendMail?email=${email}`
    try {
      const response = await fetch(url, {
        method: 'get',
      })
      const data = await response.json()
      console.log(data)
      // 根据code显示后端返回的提示信息
      if (data.code === VISITED_TOO_FREQUENTLY_ERROR) {
        toast.error(data.message, {
          position: 'top-center',
        })
        setLoading(false)
        return
      }
      if (data.code === NO_REGISTER_ERROR) {
        toast.error(data.message, {
          position: 'top-center',
        })
        setLoading(false)
        return
      }
      if (data.code === SUCCESS_CODE) {
        setLoading(false)
        toast.success(data.message, {
          position: 'top-center',
        })
        navigate(`/user/verifyCode/${email}`, { state: email })
      }
    } catch (error) {
      setLoading(false)
      return new Promise.reject(new Error(error.message))
    }
    /*-------------*/
    if (loading) {
      setLoading(false)
    }
  }
  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <Input
            iconPosition="left"
            placeholder="Please enter email"
            onChange={(e, d) => setEmail(e.target.value)}
          >
            <Icon name="at" />
            <input
              required
              type="text"
              onContextMenu={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            />
          </Input>
          {loading ? (
            <>
              <div className="sm-mg-t">
                <Button
                  color="olive"
                  fluid
                  loading={loading}
                  disabled={loading}
                >
                  Loading
                </Button>
                <p style={{ marginTop: '10px' }}>
                  正在飞速为您发送验证信息，请稍后...
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="sm-mg-t">
                <Button color="vk" fluid loading={loading}>
                  提交
                </Button>
              </div>
            </>
          )}
        </form>
        <div className="flexCenter">
          {token === null ? (
            <Link
              to={'/login'}
              style={{
                marginTop: '50px',
              }}
            >
              <p>去登录</p>
            </Link>
          ) : (
            <Link
              to={'/home'}
              style={{
                marginTop: '50px',
              }}
            >
              <p>去首页</p>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}

export default ForgetPassword
