import { combineReducers } from '@reduxjs/toolkit'

import authSlice from '../slice/auth'
import categorySlice from '../slice/category'
import messageSlice from '../slice/message'

const rootReducers = combineReducers({
  auth: authSlice,
  category: categorySlice,
  message: messageSlice,
})

export default rootReducers
