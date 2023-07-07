import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Icon, Input } from 'semantic-ui-react'
// import custom constants
import {
  INVALID_VERIFY_CODE_ERROR,
  VERIFY_CODE_EXPIRED_ERROR,
} from '../../constants'

const Verify = () => {
  const navigate = useNavigate()
  const params = useParams()

  const { email } = params

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`/api/v1/user/verifyCode?code=${code}`, {
        method: 'get',
      })
      const data = await response.json()
      if (data.code === INVALID_VERIFY_CODE_ERROR) {
        toast.error(data.message)
        setLoading(false)
        return
      }
      if (data.code === VERIFY_CODE_EXPIRED_ERROR) {
        toast.error(data.message)
        setCode('')
        setLoading(false)
        navigate('/user/password/forget')
        return
      }
      if (data.data !== null && data.data.request_id !== '') {
        toast.success(data.data.msg)
        setLoading(false)
        navigate('/user/password/new', {
          state: {
            email: email === undefined ? '' : email,
            requestId:
              data.data.request_id === undefined ? '' : data.data.request_id,
          },
        })
      }
    } catch (error) {
      setLoading(false)
      return new Promise.reject(new Error(error))
    }
  }
  return (
    <section>
      <div className="flexCenter">
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Please enter code"
            onChange={(e, d) => setCode(e.target.value)}
          >
            <input
              required
              type="text"
              onContextMenu={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            />
          </Input>
          <div className="sm-mg-t">
            <Button color="green" fluid loading={loading}>
              验证
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Verify
