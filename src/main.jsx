import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import {
  createBrowserRouter,
  Outlet,
} from 'react-router-dom';

// project styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import App from './App';
import Login from './Login';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Footer from './Footer';
import { useContext } from 'react';
import { AuthContext } from './authContext';
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
  );
}

const Protected = ({ component }) => {
  const { auth } = useContext(AuthContext);
  console.log('protected auth state ', auth);
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
]);

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));