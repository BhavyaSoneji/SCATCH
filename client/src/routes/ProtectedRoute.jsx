import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

const ProtectedRoute = ({children,allowed}) => {

  const {isLoggedIn,loading,userType} = useAuth();

  console.log(isLoggedIn,loading);
  
  if(loading){
    return <div>Loading...</div>
  }
  if(!isLoggedIn){
    return <Navigate to="/" replace />
  }
  if(allowed && !allowed.includes(userType)){
    if(userType==='user'.toLowerCase()){
      return <Navigate to="/profile" replace />
    }
    return <Navigate to="/error" replace />
  }

  return (
    children
  )
}

export default ProtectedRoute