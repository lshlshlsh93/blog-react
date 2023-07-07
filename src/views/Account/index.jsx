import { useDispatch, useSelector } from 'react-redux'
import { Input, Icon, Select, Label, Button } from 'semantic-ui-react'
import { useState } from 'react'

// impost custom components
import Dropdown from '../../components/Dropdown'

// import custom styles
import styles from './account.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const img =
  'https://images.pexels.com/photos/11785073/pexels-photo-11785073.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'

const Account = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)

  console.log(userInfo)
  const [nickName, setNickName] = useState(userInfo ? userInfo.nickName : '')
  const [email, setEmail] = useState(userInfo ? userInfo.email : '')
  const [gender, setGender] = useState(
    userInfo ? (userInfo.gender === 1 ? '男' : '女') : ''
  )
  const handleUpdate = (e) => {
    var formdata = new FormData()
    formdata.append('userId', userInfo.userId)
    formdata.append('nickName', nickName)
    formdata.append('email', email)
    formdata.append('gender', gender)
    fetch('/api/v1/user/changeInfo', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message)
        navigate('/home')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <section className={styles.AccountInfo}>
        <div className={`${styles.Container} boxItems`}>
          <h1 className="flexCenter">Account Info</h1>
          <div className={`${styles.Img} flexCenter`}>
            {/* <input type="file" src="image" alt="imgs" /> */}
            <img src={img} alt="imgs" />
          </div>
          <div>
            {/* right */}
            <div className={`${styles.Right} `}>
              <Input
                label="昵称"
                labelPosition="left"
                placeholder="password"
                onChange={(e, d) => setNickName(e.target.value)}
                input={
                  <input
                    defaultValue={userInfo.nickName}
                    required
                    type="text"
                    onContextMenu={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                  />
                }
              />
              <Input
                label="邮箱"
                labelPosition="left"
                className="sm-mg-t"
                placeholder="email"
                onChange={(e, d) => setEmail(e.target.value)}
                input={
                  <input
                    defaultValue={userInfo.email}
                    required
                    type="text"
                    onContextMenu={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                  />
                }
              />
              <Select
                className="sm-mg-t"
                placeholder="请选择性别"
                defaultValue={userInfo.gender}
                onChange={(e, d) => setGender(e.target.textContent)}
                options={[
                  {
                    key: 'male',
                    value: 1,
                    text: '男',
                  },
                  {
                    key: 'female',
                    value: 0,
                    text: '女',
                  },
                ]}
              />
            </div>
            <div
              className="flexCenter"
              style={{
                marginTop: '15px',
              }}
            >
              <Button
                className="sm-mg-t"
                color="teal"
                onClick={handleUpdate}
                style={{
                  marginRight: '25px',
                }}
              >
                更新信息
              </Button>
              <Button
                className="sm-mg-t"
                color="teal"
                onClick={() => navigate('/user/password/forget')}
              >
                找回密码
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Account
