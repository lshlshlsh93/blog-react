import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: undefined,
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    saveMessage: (state, action) => {
      state.message = action.payload
    },
    clearMessage: (state) => {
      state.message = undefined
    },
  },
})
// Action Creator 用于执行返回描述如何更新 state 的 Action
export const { saveMessage, clearMessage } = messageSlice.actions

export const saveMessageAsync = (message) => (dispatch) => {
  setTimeout(() => {
    dispatch(saveMessage(message))
  }, 1500)
}

// Reducer，真正执行修改 state 的纯函数
export default messageSlice.reducer
