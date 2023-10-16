import React from 'react';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

import { useAuth } from "../provider/authProvider";

const Reg = ({url}) => {
  const timerRef = useRef(null);

  const { token } = useAuth();

  const [alertMessage, setAlertMessage] = useState();
  const [logout, setLogout] = useState(false);
  const [regs, setRegs] = useState();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const refresh = () => {
      const url_get = `${url.origin}/reg`;
      axios.get(url_get)
        .then(function (response) {
          setRegs(response.data);
        })
        .catch(function (err) {
          setAlertMessage(err.message);
          timerRef.current = setTimeout(() => {
            setLogout(true);
            setAlertMessage();
          }, 3000);
        });  
    };
  
    refresh();
  }, [url.origin]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (logout) {
    return <Navigate to="/logout" replace={true} />;
  }

  if (!regs) {
    return <>Please wait...</>;
  }

  const regItems = regs.map(reg =>
    <li key={reg.port}>
      {reg.ip}::{reg.port}, {reg.path}
    </li>
  );

  return (
    <>
      {
        alertMessage && 
        <Alert variant="danger" onClose={() => setAlertMessage()} dismissible>
          {alertMessage}
        </Alert>
      }
      <h1>Plugins</h1>
      <ul>{regItems}</ul>
    </>
  );
};

export default Reg;