import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isSignedIn } from '../../redux/userSlice';

interface PrivateRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const flag = useSelector(isSignedIn);
  return flag ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;