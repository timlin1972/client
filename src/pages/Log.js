import React from 'react';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import { useAuth } from "../provider/authProvider";

const Log = ({url}) => {
  const timerRef = useRef(null);

  const { token } = useAuth();

  const [alertMessage, setAlertMessage] = useState();
  const [logout, setLogout] = useState(false);
  const [log, setLog] = useState();

  const refresh = () => {
    const url_get = `${url.origin}/plugin/log`;
    axios.get(url_get)
      .then(function (response) {
        setLog(response.data);
      })
      .catch(function (err) {
        setAlertMessage(err.response.data);
        timerRef.current = setTimeout(() => {
          setLogout(true);
          setAlertMessage();
        }, 3000);
      });  
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (logout) {
    return <Navigate to="/logout" replace={true} />;
  }

  if (!log) {
    return <>Please wait...</>;
  }

  return (
    <>
      {
        alertMessage && 
        <Alert variant="danger" onClose={() => setAlertMessage()} dismissible>
          {alertMessage}
        </Alert>
      }
      <h1>Log</h1>
      {log.log.length ? log.log.map(txt => <p>{txt}</p>) : <p>Empty</p>}
      <Button variant="dark" onClick={refresh}>Refresh</Button>
    </>
  );

  return (
    <>Log</>
  )
};

export default Log;