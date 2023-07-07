import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

const RootBoundary = () => {
  const error = useRouteError()
  // console.log('---------', error, '---------')
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <h1>🫖This page doesn't exist!🫖</h1>
    }
    if (error.status === 499) {
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
            <h1>🫖Ivalid Action!🫖</h1>
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
                点我<span>重新登录</span>
              </p>
            </Link>
          </div>
        </>
      )
    }
    if (error.status === 401) {
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
            <h1>对不起，您的登录信息已过期</h1>
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
                点我<span>重新登录</span>
              </p>
            </Link>
          </div>
        </>
      )
    }
    if (error.status === 503) {
      return <h1>🫖Looks like our API is down🫖</h1>
    }
    if (error.status === 418) {
      return <h1>🫖</h1>
    }
  }
  return <h1>Something went wrong</h1>
}

export default RootBoundary
