import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../provider/authProvider";

const Logout = () => {
    const { setToken } = useAuth();
    const { token } = useAuth();

    const handleClick = () => {
        setToken();
    };

    return <>
        {!token &&
            <Navigate to="/login" replace={true} />
        }
        {token &&
            <Button variant="primary" onClick={handleClick}>Logout</Button>
        }
    </>;
};

export default Logout;
