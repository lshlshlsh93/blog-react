import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Icon, Input } from 'semantic-ui-react'

// custom styles
import styles from './register.module.css'
function Register(props) {
  // state
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  // func

  const submitHandler = async (e) => {
    e.preventDefault()
    let nickName = e.target[0].value
    let email = e.target[1].value
    let password = e.target[2].value
    let confirmPassword = e.target[2].value
    await register({ nickName, email, password, confirmPassword })
  }

  /**
   * 注册
   */
  const register = async ({ nickName, email, password, confirmPassword }) => {
    const registeredInResponse = await fetch('/api/v1/user/register', {
      method: 'POST',
      // mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickName, email, password, confirmPassword }),
    })
    const registeredIn = await registeredInResponse.json()
    console.log('register result: ', registeredIn)

    if (registeredIn.code === 200) {
      clearForm()
      navigate('/login')
    }
  }
  /**
   * 清除表单数据
   */
  const clearForm = () => {
    setNickName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  // hooks func

  useEffect(() => {}, [])

  return (
    <div className={styles.Register}>
      {/* form */}
      <form className={styles.RegisterForm} onSubmit={submitHandler}>
        {/* nickname */}
        <Input
          className="sm-mg-t"
          iconPosition="left"
          placeholder="Please enter your nickname"
          onChange={(e, d) => setNickName(e.target.value)}
        >
          <Icon name="user plus" />
          <input
            required
            type="text"
            onContextMenu={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
        </Input>
        {/* email */}
        <Input
          className="sm-mg-t"
          iconPosition="left"
          placeholder="Please enter your email"
          onChange={(e, d) => setNickName(e.target.value)}
        >
          <Icon name="at" />
          <input
            required
            type="email"
            onContextMenu={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
        </Input>
        {/* password */}
        <Input
          className="sm-mg-t"
          iconPosition="left"
          placeholder="Please enter password"
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
        {/* confirmPassword */}
        <Input
          className="sm-mg-t"
          iconPosition="left"
          placeholder="Re enter password"
          onChange={(e, d) => setConfirmPassword(e.target.value)}
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
        {/* register btn */}
        <div className="sm-mg-t">
          <Button color="facebook" fluid>
            注册
          </Button>
        </div>
        {/* other */}
        <p style={{ margin: '25px' }}>
          已有帐户?
          <Link to="/login">
            <span>去登录</span>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
