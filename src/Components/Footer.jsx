import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { ImInstagram } from 'react-icons/im'

function Footer() {
  return (
    <div>
      <div className='w-full h-80 bg-[#EEEFFB] flex justify-around mt-6'>
         <div className='flex flex-col gap-7 mt-6'>
            <h1 className='text-4xl font-bold'>Hekto</h1>
            <div>
            <input type="text" placeholder='Enter Email Address' className='bg-white border-none text-gray-500 w-60 py-2 text-[18px] px-5'/>
            <button className='px-8 py-2 bg-[#FB2E86] text-[18px] text-white'>Sign up</button>
            </div>
            <div>

            <span className='text-gray-500'>Contact Info</span>
            <p className='text-gray-500'>17 Princess Road, London, Greater London NW1 8JR, UK</p>
            </div>
         </div>

         <div className='mt-6'>
            <h1 className='text-2xl font-bold'>Categories</h1>
            <div>
                <ul className='flex flex-col gap-3 mt-7 text-gray-500'>
                    <li>Laptops and Computers </li>
                    <li>Cameras and Photography </li>
                    <li>Smart Phones and Tablets </li>
                    <li>Video Gaes and Consoles </li>
                    <li>Waterproof Headphones</li>
                </ul>
            </div>
         </div>

         <div className='mt-6'>
             <h1 className='text-2xl font-bold'>Customer Care</h1>
            <div>
                <ul className='flex flex-col gap-3 mt-7 text-gray-500'>
                    <li>My Account</li>
                    <li>Discount </li>
                    <li>Returns  </li>
                    <li>Orders History   </li>
                    <li>Order Tracking</li>
                </ul>
            </div>
         </div>

         <div className='mt-6'>
             <h1 className='text-2xl font-bold'>Pages</h1>
            <div>
                <ul className='flex flex-col gap-3 mt-7 text-gray-500'>
                    <li>Blog </li>
                    <li> Browse the Shop</li>
                    <li> Category</li>
                    <li>Pre-Built Pages </li>
                    <li> Visual Composer Elements</li>
                    <li>WooCommerce Pages</li>
                </ul>
            </div>
         </div>
      </div>

      <div className='flex justify-around items-center py-2 bg-[#E7E4F8]'>
        <p>©Webecy - All Rights Reserved</p>
         <div className='flex gap-3'>
            <FaFacebook/>
            <ImInstagram/>
            <BsTwitter/>
         </div>
      </div>
    </div>
  )
}

export default Footer
