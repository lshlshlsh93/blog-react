import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: null,
}
const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    saveCategory: (state, action) => {
      state.category = action.payload
    },
  },
})
// Action Creator 用于执行返回描述如何更新 state 的 Action
export const { saveCategory } = categorySlice.actions

// 异步 thunk，用于需要在更新数据前异步处理数据的情况
export const saveCategoryAsync = (category) => (dispatch) => {
  setTimeout(() => {
    dispatch(saveCategory(category))
  }, 1500)
}

// Reducer，真正执行修改 state 的纯函数
export default categorySlice.reducer
