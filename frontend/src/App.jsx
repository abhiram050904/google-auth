import React, { useEffect, useState } from 'react'

import {BrowserRouter,Route,Navigate, Routes} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Pagenotfound from './components/Pagenotfound'
import { GoogleOAuthProvider } from '@react-oauth/google'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const App = () => {

  const [isAuthenicated,setIsAuthenticated]=useState(false)

  const GoogleAuthWrapper=()=>{
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <Login/>
      </GoogleOAuthProvider>
    )
  }

  useEffect(() => {
    const userData = localStorage.getItem("user-info");
    if (userData) {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRoute=({element})=>{
    return isAuthenicated? element :<Navigate to='/login' />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<GoogleAuthWrapper/>}></Route>
        <Route path='/' element={<Navigate to='/login' />}></Route>
        <Route path='dashboard' element={<PrivateRoute element={<Dashboard/>}/>}></Route>
        <Route path='*' element={<Pagenotfound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
