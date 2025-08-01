import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserSignUp from './pages/UserSignUp';
import UserLogin from './pages/UserLogin';
import CaptainSignup from './pages/CaptainSignup';
import Captainlogin from './pages/Captainlogin';
import Home from './pages/Home';
const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route path="/captain/login" element={<Captainlogin />} />
      </Routes>
    </div>
  )
}

export default App