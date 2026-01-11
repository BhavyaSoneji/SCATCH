import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/cartContext.jsx'

import {Toaster} from "react-hot-toast"

import {GoogleOAuthProvider} from "@react-oauth/google"


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Toaster
    position='top-right'
    toastOptions={{
      duration:3000,
      style:{
        background: '#363636',
        color:'#fff'
      },
      success:{
        duration:3000,
        iconTheme:{
          primary:'#4ade80',
          secondary: '#fff'
        }
      }
    }}
  />
  
  <GoogleOAuthProvider clientId={'213268500140-e3ojtenhs6e75gefoh0r92rc53iqc0is.apps.googleusercontent.com'}>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
)
