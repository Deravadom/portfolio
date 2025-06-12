import { Route, Routes } from 'react-router'
import { ToastContainer } from "react-toastify"
import './App.css'
import Home from './components/pages/Home'
import Header from './components/header/Header'
import AboutMe from './components/pages/AboutMe'
import Blog from './components/pages/Blog'
import Projects from './components/pages/Projects'
import Contact from './components/pages/Contact'

const App = () => {
  return (
    <div
      className='absolute top-0 left-0 w-full flex flex-col items-start min-h-screen py-6 text-primary border-primary border-none'
    >
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<AboutMe />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
