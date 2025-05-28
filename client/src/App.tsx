// import reactLogo from './assets/react.svg'

import { Route, Routes } from 'react-router'
import { ToastContainer } from "react-toastify"
import './App.css'

const App = () => {
  return (
    <div className='absolute top-0 left-0 w-full min-h-screen py-6 px-8 bg-white text-primary border-primary border-none'>
      <Routes>
        <Route index element={<>index</>} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
