import { useState, createContext } from 'react'

/**
 * 用户信息上下文
 */
export function UserContextProvider({ Children }) {
  const [userInfo, setUserInfo] = useState({})
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <Children />
    </UserContext.Provider>
  )
}
export const UserContext = createContext({})
