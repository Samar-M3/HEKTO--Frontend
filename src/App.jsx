import React from 'react'
import { Route, Routes } from 'react-router'
import Header from './Components/Header'
import Home from './Pages/Home'
import Pages from './Pages/Pages'
import Blog from './Pages/Blog'

import Shop from './Pages/Shop'
import Contact from './Pages/Contact'
import Login from './Components/Login'
import Footer from './Components/Footer'
import DetailPage from './Pages/DetailPage'
import ProtectedLayout from './Pages/ProtectedLayout'
import Dashboard from './Pages/Dashboard'
import Cart from './Layers/Cartt'
import Cartt from './Layers/Cartt'
import Protected from './Pages/Protected'
import Signup from './Components/Signup'
import User from './AdminPages/User'
import AdminProduct from './AdminPages/AdminProduct'
import PublicLayout from './Pages/PublicLayout'
import AdminBanner from './AdminPages/AdminBanner'
import { ToastContainer } from 'react-toastify'
import OrderPage from './AdminPages/OrderPage'
import Payment from './AdminPages/Payment'
import PageNotFound from './Components/PageNotFound'
import Profle from './User/Profle'
import Wishlist from './Pages/Wishlist'
// import Myproducts from './AdminPages/Myproducts'


function App() {
  return (
    
    <div>
      <Routes>

      <Route path='/' element={<PublicLayout/>}>

      <Route path='/' element={<Home/>}/>
      <Route path='/pages' element={<Pages/>}/>
      <Route path='/blog' element={<Blog/>}/>
      <Route path='/product/:id' element={<DetailPage/>}/>
      <Route path='/shop' element={<Protected><Shop/></Protected>}/>
      <Route path='/contact' element={<Contact/>}/> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
      <Route path='/mycart' element={<Protected><Cartt/></Protected>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profle/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>

      </Route>
    
      <Route path='/dashboard' element={<ProtectedLayout/>}
      >
        <Route  index element={<Dashboard/>}/>
        <Route  path="user" element={<User/>}/>
        <Route  path="product" element={<AdminProduct/>}/>
        <Route  path="wish" element={<div>THis is wish</div>}/>
        {/* <Route  path="myproduct" element={<Myproducts/>}/> */}
        <Route  path="order" element={<OrderPage/>}/>
        <Route  path="banner" element={<AdminBanner/>}/>
        <Route path='payment' element={<Payment/>}/>
        
      </Route>
    
      </Routes>
      <div>
               <ToastContainer
         position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        className="z-[9999]"
      />
   
      </div>
        

   
    </div>
  )
}

export default App
