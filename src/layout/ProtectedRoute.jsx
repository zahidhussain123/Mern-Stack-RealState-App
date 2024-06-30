import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuthCheck from '../hooks/useAuthCheck'

const ProtectedRoute = () => {
  const {validateLogin} =  useAuthCheck()
  return validateLogin() ? <Outlet /> : <Navigate to={"/"} />
}

export default ProtectedRoute