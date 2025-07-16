import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/UseAuth";
import Loading from "../Shared/Loading/Loading";





const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <Loading/>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;