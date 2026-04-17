import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Latest_products from './Layers/Latest_products.jsx'
import CartContext from './hooks/CartContext.jsx'
import axios from 'axios'
import BaseUrl from './constant.js'

axios.defaults.baseURL = BaseUrl

createRoot(document.getElementById('root')).render(
    
    <CartContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CartContext>

)
