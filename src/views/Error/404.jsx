import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '520px',
          }}
        >
          <h1>Oops! Page 404 Not Found </h1>
          <p>
            Back to &nbsp;
            <Link to="/home">Home</Link>.
          </p>
        </div>
      </div>
    </>
  )
}

export default Page404
