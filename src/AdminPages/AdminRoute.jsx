import React from 'react'
import { Navigate } from 'react-router'

function AdminRoute({children}) {
    const token=localStorage.getItem("token")
    const user=JSON.parse(localStorage.getItem("user"))
    if(!token || user?.role !== "superadmin"){
        return <Navigate to="/login" replace/>
    }
  return children
}

export default AdminRoute
