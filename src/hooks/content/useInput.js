import { useState } from 'react'

export const useInput = (initialValue, submitAction) => {
  // state
  const [inputValue, setInputValue] = useState(initialValue)

  // cb
  const handleChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleSubmit = () => {
    setInputValue('')
    submitAction(inputValue)
  }
  // return
  return [inputValue, handleChange, handleSubmit]
}
