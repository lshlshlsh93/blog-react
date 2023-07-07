import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import {
  FLUSH,
  PAUSE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  PURGE,
  persistStore,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// import custom reducers
import rootReducers from './store/reducer'

// import custom routes
import { router } from './router'

// inport custom css
import './style/index.css'

// import third-part css
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

/**
 * 初始化配置信息
 */
const persistConfig = { key: 'root', storage, version: 1 }

// reducer
const persistedReducer = persistReducer(persistConfig, rootReducers)
// create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, REGISTER, PURGE],
      },
    }),
})

// persistor
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
