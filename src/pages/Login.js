import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import { useAuth } from "../provider/authProvider";

const Login = ({url}) => {
    const timerRef = useRef(null);

    const { setToken } = useAuth();
    const { token } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const url_post = `${url.origin}/auth`;
        axios.post(url_post, {
            "username": username,
            "password": password,
        })
          .then(function (response) {
            setToken(response.data);
          })
          .catch(function (err) {
            setAlertMessage(err.response.data);
            setAlert(true);
            timerRef.current = setTimeout(() => setAlert(false), 5000);
          });
    }

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
      }, []);

    if (token) {
        return <Navigate to="/sysstat" replace={true} />;
    }

    return (
        <>
            <div class="sidenav">
                <div class="login-main-text">
                    <h2>Center</h2>
                    <h4>Login Page</h4>
                    <p>{url.host}</p>
                </div>
            </div>
            <div class="main">
                <div class="col-md-6 col-sm-12">
                    <div class="login-form">
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Login
                            </Button>
                            {alert && <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                                {alertMessage}
                            </Alert>
                            }
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
