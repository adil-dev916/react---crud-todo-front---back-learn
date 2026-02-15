import React from 'react'
import { Toaster } from 'react-hot-toast';
import Todo from './Todo';
import './App.css'

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Todo />
    </>
  )
}

export default App
