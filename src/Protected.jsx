import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';

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

export default Protected;