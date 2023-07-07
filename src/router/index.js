import {
  Link,
  createBrowserRouter,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom'

// import custom utils
import { getSessionCache } from '../utils'

/* import custom components */
// user
import Login from '../views/Login'
import Register from '../views/Register'
import Account from '../views/Account'
import ForgetPassword from '../views/ForgetPassword'
import NewPassword from '../views/ForgetPassword/newPassword'
import Verify from '../views/ForgetPassword/verify'

// article
import ArticleList from '../views/Article'
import Create from '../views/Create'
import Detail from '../views/Detail'
import NewPost from '../views/NewPost'
// category
import Category from '../views/Category'

// tag
import Tag from '../views/Tag'
import Home from '../views/Home'
import App from '../App'

// logs
import SysOpLogs from '../views/sysOpLogs'

// about
import About from '../views/About'

// archives
import Archives from '../views/Archives'

// error Page
import NoAuth from '../components/NoAuth'
import RootBoundary from './rootBoundary'
import OtherBoundary from './otherBoundary'
import Page404 from '../views/Error/404'
import UploadFile from '../components/UploadFile'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: () => {
      // 从sessionStorage里面获取token消息，如果获取不到，说明用户未登录
      let token = getSessionCache('token')
      if (!token) {
        throw new Response('unauthorized', { status: 401 })
      }
      return token
    },
    errorElement: <RootBoundary />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'detail/:id',
        element: <Detail />,
        loader: ({ params }) => {
          if (!params.id) {
            throw new Response('Invald action', { status: 499 })
          }
          return params
        },
        errorElement: <OtherBoundary />,
      },
      {
        path: 'articleList/:categoryId/:categoryName',
        element: <ArticleList />,
        loader: ({ params }) => {
          return params
        },
      },
      {
        path: 'category',
        element: <Category />,
      },
      {
        path: 'account/:id',
        element: <Account />,
        loader: ({ params }) => {
          if (!params.id) {
            throw new Response('Invald action', { status: 499 })
          }
          return params
        },
        errorElement: <OtherBoundary />,
      },
      {
        path: 'add',
        element: <NewPost />,
      },
      {
        path: 'create',
        element: <Create />,
      },
      { path: 'sysOpLogs', element: <SysOpLogs /> },
      {
        path: 'tag',
        element: <Tag />,
      },
      {
        path: 'archives',
        element: <Archives />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/',
    element: <NoAuth />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'upload',
        element: <UploadFile />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'user',
        children: [
          {
            path: 'password',
            children: [
              {
                path: 'forget',
                element: <ForgetPassword />,
              },
              {
                path: 'new',
                element: <NewPassword />,
              },
            ],
          },
          {
            path: 'verifyCode/:email',
            loader: ({ params }) => {
              if (!params.email) {
                throw new Response('Invald action', { status: 499 })
              }
              return params
            },
            element: <Verify />,
            errorElement: <OtherBoundary />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
])
