import { useEffect, useState } from 'react'

// custom styles
import styles from './register.module.css'
function Register(props) {
  // state
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // func
  const submitHandler = (e) => {
    e.preventDefault()
  }

  // hooks func
  useEffect(() => {}, [])

  return (
    <div className={styles.Register}>
      {/* title */}
      <span className={styles.RegisterTitle}>Register</span>
      {/* form */}
      <form className={styles.RegisterForm}>
        {/* username */}
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          type="text"
          name="username"
          required
          autoFocus
          className={styles.RegisterInput}
          placeholder="Enter your username"
        />
        {/* email */}
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="text"
          name="eamil"
          required
          className={styles.RegisterInput}
          placeholder="Enter your email"
        />
        {/* password */}
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
          className={styles.RegisterInput}
          placeholder="Enter your password"
        />
        {/* register */}
        <button className={styles.RegisterBtn} onClick={submitHandler}>
          Register
        </button>
      </form>
      {/* login */}
      <button className={styles.LoginBtn}>Login</button>
    </div>
  )
}

export default Register
