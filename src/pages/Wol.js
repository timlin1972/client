import React from 'react';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Wol = ({url}) => {
  const timerRef = useRef(null);

  const [alertMessage, setAlertMessage] = useState();
  const [wol, setWol] = useState();

  function handleClick() {
    const url_post = `${url.origin}/plugin/wol`;
    axios.post(url_post, {
      "device": "nas"
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

  useEffect(() => {
    const refresh = () => {
      const url_get = `${url.origin}/plugin/wol`;
      axios.get(url_get)
        .then(function (response) {
          setWol(response.data);
        })
        .catch(function (err) {
          setAlertMessage(err.response.data);
          timerRef.current = setTimeout(() => {
            setAlertMessage();
          }, 3000);
        });  
    };

    refresh();
  }, [url.origin]);

  return (
    <>
      {
        alertMessage && 
        <Alert variant="danger" onClose={() => setAlertMessage()} dismissible>
          {alertMessage}
        </Alert>
      }

      <h1>Wake on LAN</h1>

      {
        wol &&
        <>
          <h3>{wol[0].name}</h3>
          <p>mac: {wol[0].mac}</p>
          <p>ip: {wol[0].ip}</p>
        </>
      }

      <Button variant="dark" onClick={handleClick}>LinDS</Button>
    </>
  );
};

export default Wol;