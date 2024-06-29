import React, { useContext } from 'react'
import UserDetailsContext from '../context/UserDetailsContext'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
   const {userDetails: {token}} = useContext(UserDetailsContext)
  return token ? <Outlet /> : <Navigate to={"/"} />
}

export default ProtectedRoute