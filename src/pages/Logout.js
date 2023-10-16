import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
    const { setToken } = useAuth();

    setToken();

    return <Navigate to="/login" replace={true} />;
};

export default Logout;
