import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router'

function PublicLayout() {
  return (
    <div>
       <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
    </div>
  )
}

export default PublicLayout
