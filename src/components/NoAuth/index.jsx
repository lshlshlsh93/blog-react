import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// import custom constants
import { DEFAULT_TOAST_COUNT } from '../../constants'

function NoAuth() {
  return (
    <>
      <ToastContainer limit={DEFAULT_TOAST_COUNT} />
      <Outlet />
    </>
  )
}

export default NoAuth
