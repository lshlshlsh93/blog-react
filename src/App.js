import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// import custom constants
import { DEFAULT_TOAST_COUNT } from './constants'

// import custome components
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <>
      <ToastContainer limit={DEFAULT_TOAST_COUNT} />
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    </>
  )
}

export default App
