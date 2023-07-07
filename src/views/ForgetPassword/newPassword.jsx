import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// import custom constants
import { SUCCESS_CODE, FAIL_CODE } from '../../constants'

function NewPassword() {
  const location = useLocation()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { email, requestId } = location.state
  console.log(location.state)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.trim() !== confirmPassword.trim()) {
      toast.error('两次输入的密码不一致,请重新输入')
      return
    } else {
      await changePassword({ email, password, confirmPassword, requestId })
    }
  }
  const changePassword = async ({ password, confirmPassword, requestId }) => {
    const response = await fetch('/api/v1/user/changePassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, requestId, password, confirmPassword }),
    })
    const changeResult = await response.json()

    if (changeResult.code === FAIL_CODE) {
      toast.error(changeResult.message)
    }
    if (changeResult.code === SUCCESS_CODE) {
      toast.success(changeResult.message)
      navigate('/login')
    }
  }

  return (
    <>
      <section style={{ minHeight: '440px' }}>
        <div>
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: '175px',
            }}
          >
            <input
              className={`m-input m-input-base`}
              placeholder="请输入您的新密码"
              type="password"
              required
              id="passwd"
              onContextMenu={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <input
              className={`m-input m-input-base`}
              placeholder="请再次输入您的新密码"
              type="password"
              required
              id="confirmPasswd"
              onContextMenu={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
            />
            <button className="button">提交</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default NewPassword
