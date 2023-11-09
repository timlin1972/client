import React from 'react';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Screen = ({url}) => {
  const timerRef = useRef(null);

  const [alertMessage, setAlertMessage] = useState();

  function handleScreen(action) {
    const url_post = `${url.origin}/plugin/screen`;
    axios.post(url_post, {
      "action": action
    })
      .then(function (response) {
        setAlertMessage(response.data);
        timerRef.current = setTimeout(() => {
          setAlertMessage();
        }, 3000);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      {
        alertMessage && 
        <Alert variant="danger" onClose={() => setAlertMessage()} dismissible>
          {alertMessage}
        </Alert>
      }

      <h1>Screen</h1>
      <Button variant="dark" onClick={() => handleScreen("on")}>On</Button>
      <Button variant="dark" onClick={() => handleScreen("off")}>Off</Button>
    </>
  );
};

export default Screen;