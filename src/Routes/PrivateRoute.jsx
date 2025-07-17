import { Navigate, useLocation } from "react-router";

import Loading from "../Shared/Loading/Loading";
import useAuth from "../Hooks/UseAuth";





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