import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useUser from "@/hooks/use-user";
import Spinner from "@/components/Spinner/Spinner";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading, error } = useUser();
  const location = useLocation();
  const publicRoutes = ["/login", "/register"];

  if (isLoading) {
    return <Spinner />;
  }

  if (!user && !publicRoutes.includes(location.pathname)) {
    toast.error("You need to login to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
