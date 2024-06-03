import React, { useEffect, useState } from 'react'
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
import { Navigate } from 'react-router-dom';
// import Protected from './Protected'

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

const Protected = ({ component }) => {
  const { auth } = useContext(AuthContext);
  console.log('prtected auth state ', auth)
  return auth?.accessToken ? (
    <>
    {component}
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Protected component={<App />} />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
])


const AuthContextProvider = ({ children }) => {
  let tempToken = JSON.parse(localStorage.getItem('token'))
  const [accessToken, setAccessToken] = useState(tempToken ? tempToken : [])

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(accessToken))
  }, [accessToken])
  

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