import { Link } from 'react-router-dom'

const OtherBoundary = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '713px',
          flexDirection: 'column',
          background: `url('https://cdn.jsdelivr.net/gh/lshlshlsh93/image-host/image/error.jpg')`,
        }}
      >
        <h1>Invalid Action!</h1>
        <Link
          to="/home"
          style={{
            marginTop: '20px',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              color: 'blue',
            }}
          >
            返回<span>首页</span>
          </p>
        </Link>
        <Link
          to="/login"
          style={{
            marginTop: '20px',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              color: 'blue',
            }}
          >
            <span>去登录</span>
          </p>
        </Link>
        <Link
          to="/register"
          style={{
            marginTop: '20px',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              color: 'blue',
            }}
          >
            <span>去注册</span>
          </p>
        </Link>
      </div>
    </>
  )
}

export default OtherBoundary
