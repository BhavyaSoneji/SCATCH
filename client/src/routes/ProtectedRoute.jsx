import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {

  const {isLoggedIn,loading} = useAuth();

  console.log(isLoggedIn,loading);
  
  if(loading){
    return <div>Loading...</div>
  }
  if(!isLoggedIn){
      return <Navigate to="/" replace />
    }

  return (
    children
  )
}

export default ProtectedRoute