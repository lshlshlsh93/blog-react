import { BLOG_LOGO_CDN_URL } from '../../constants'

function Logo() {
  return (
    <>
      <img
        style={{
          width: '30px',
          height: '30px',
          objectFit: 'cover',
          margin: '2px 5px',
        }}
        src={BLOG_LOGO_CDN_URL}
        alt="..."
      />
    </>
  )
}

export default Logo
