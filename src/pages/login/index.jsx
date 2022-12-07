import { useEffect, useState } from 'react'

// custom styles
import styles from './login.module.css'
function Login(props) {
  // state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // func
  const submitHandler = (e) => {
    e.preventDefault()
  }

  // hooks func
  useEffect(() => {}, [])

  return (
    <div className={styles.Login}>
      {/* title */}
      <span className={styles.LoginTitle}>Login</span>
      {/* form */}
      <form className={styles.LoginForm}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="text"
          name="eamil"
          required
          autoFocus
          className={styles.LoginInput}
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          id="password"
          type="password"
          name="password"
          required
          className={styles.LoginInput}
          placeholder="Enter your password"
        />
        {/* login */}
        <button className={styles.LoginBtn} onClick={submitHandler}>
          Login
        </button>
      </form>
      {/* register */}
      <button className={styles.RegisterBtn}>Register</button>
    </div>
  )
}

export default Login
