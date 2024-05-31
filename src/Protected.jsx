import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const Protected = ({ Component }) => {
  const { auth } = useContext(AuthContext);
  return auth?.accessToken ? (
    <Component />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default Protected;