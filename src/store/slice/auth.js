import { createSlice } from '@reduxjs/toolkit'
import {
  setSessionCache,
  getSessionCache,
  clearSessionCache,
  clearLocalCache,
} from '../../utils'

const initialAuthState = {
  user: getSessionCache('user') ? JSON.parse(getSessionCache('user')) : null,
  token: getSessionCache('token') ? getSessionCache('token') : '',
  userId: '',
}
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setLogin: (state, action) => {
      const { token, userId } = action.payload
      // state.user = user
      state.token = token
      state.userId = userId
      setSessionCache('token', token, 1000)
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
      state.userId = ''
      // 清除localStorage和sessionStorage缓存信息
      clearLocalCache()
      clearSessionCache()
    },
    setUserInfo: (state, action) => {
      const { user } = action.payload
      state.user = user
    },
    getCurrentUser: (state) => {
      return state.user
    },
  },
})
// Action Creator 用于执行返回描述如何更新 state 的 Action
export const { setLogin, setLogout, setUserInfo } = authSlice.actions

// Reducer，真正执行修改 state 的纯函数
export default authSlice.reducer
