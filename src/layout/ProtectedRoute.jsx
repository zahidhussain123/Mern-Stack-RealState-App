import React, { useContext } from 'react'
import UserDetailsContext from '../context/UserDetailsContext'
import { Outlet, Navigate } from 'react-router-dom'
import useAuthCheck from '../hooks/useAuthCheck'

const ProtectedRoute = () => {
//    const {userDetails: {token}} = useContext(UserDetailsContext)
  const {validateLogin} =  useAuthCheck()
  return validateLogin() ? <Outlet /> : <Navigate to={"/"} />
}

export default ProtectedRoute