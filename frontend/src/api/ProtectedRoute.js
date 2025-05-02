import { useAuth } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;