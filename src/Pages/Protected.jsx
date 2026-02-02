import React from 'react'
import BaseUrl from '../constant'
import { Navigate, useNavigate } from 'react-router'

function Protected({children}) {
 
  const token=localStorage.getItem("token")
  if(!token){
    return <Navigate to="/login "replace/>
  }
  return children
}

export default Protected
