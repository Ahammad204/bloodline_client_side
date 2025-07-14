import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Router'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className="max-w-screen-xl p-2 md:p-0 mx-auto">
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </div>
  </StrictMode>,
)
