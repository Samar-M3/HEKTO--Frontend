import React from 'react'
import New_Products from '../Layers/New_Products'
import Banner from '../Components/Banner'
import Latest_products from '../Layers/Latest_products'
import Shopex_Offer from '../Components/Shopex_Offer'
import MidBanner from '../Components/MidBanner'
import Latest_Blog from '../Layers/Latest_Blog'

function Home() {

  return (
    <>
      <Banner/>
   <New_Products/>
   <Latest_products/>
   <Shopex_Offer/>
   <MidBanner/>
   <Latest_Blog/>
    
   
    </>
  )
}

export default Home
