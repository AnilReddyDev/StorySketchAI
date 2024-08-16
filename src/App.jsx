import React from 'react'
import GeminiAPI from './components/GeminiAPI'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Passwordpg from './components/Passwordpg'
export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Passwordpg/>}/>
    <Route path='/home' element={<GeminiAPI/>}/>
   </Routes>
   </BrowserRouter>
  )
}
