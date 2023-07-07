import React from 'react'

const NoData = ({
  height = '510px',
  fontSize = '32px',
  color = 'red',
  content = 'No data',
}) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
        }}
      >
        <p
          style={{
            fontSize: fontSize,
            color: color,
          }}
        >
          {content}
        </p>
      </div>
    </>
  )
}

export default NoData
