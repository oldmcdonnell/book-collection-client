import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App'
import Login from './Login'
import ErrorPage from './ErrorPage'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './authContext'
import Protected from './Protected'

function Layout() {
  return (
    <>
      <Header />
      <div id='page-content'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Protected Component={App} />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
])


const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState([])

  const auth = {
    accessToken,
    setAccessToken
  }
    return (
      <AuthContext.Provider value={{ auth }} >
        {children}
      </AuthContext.Provider>
   )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <RouterProvider router={router} />
  </AuthContextProvider>
)