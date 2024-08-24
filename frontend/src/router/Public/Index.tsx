import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isSignedIn } from '../../redux/userSlice';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const flag = useSelector(isSignedIn);
  return !flag ? children : <Navigate to="/main" />;
};

export default PublicRoute;