import React from 'react';
import { useState, useEffect, useRef, useRunOnce } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';

import { useAuth } from "../provider/authProvider";

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
}

const SysStat = ({url}) => {
  const timerRef = useRef(null);

  const { token } = useAuth();

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [logut, setLogout] = useState(false);
  const [sysStat, setSysStat] = useState();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const url_get = `${url.origin}/plugin/sys_stat`;
    axios.get(url_get)
      .then(function (response) {
        console.log(response.data);
        setSysStat(response.data);
      })
      .catch(function (err) {
        setAlertMessage(err.response.data);
        setAlert(true);
        timerRef.current = setTimeout(() => {
          setLogout(true);
          setAlert(false);
        }, 5000);
      });  
  }, []);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (logut) {
    return <Navigate to="/logout" replace={true} />;
  }

  if (!sysStat) {
    return <>Please wait...</>;
  }

  return (
    <>
    {alert && <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
        {alertMessage}
    </Alert>
    }
    <h1>Sys Stat</h1>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>AC Power</Accordion.Header>
          <Accordion.Body>
            <p>{sysStat.ac_power ? "Yes": "No"}</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Battery</Accordion.Header>
          <Accordion.Body>
            <p>Remaining Capacity: {sysStat.battery.remaining_capacity}</p>
            <p>Remaining Time: {sysStat.battery.remaining_secs}</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Boot Time</Accordion.Header>
          <Accordion.Body>
            <p>{sysStat.boot_time}</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>CPU Temperature</Accordion.Header>
          <Accordion.Body>
            <p>{sysStat.cpu_temp}</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Load Average</Accordion.Header>
          <Accordion.Body>
            <p>1 min: {sysStat.load_average.one}</p>
            <p>5 mins: {sysStat.load_average.five}</p>
            <p>15 mins: {sysStat.load_average.fifteen}</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Memory</Accordion.Header>
          <Accordion.Body>
            <p>Used {round(sysStat.memory.used / 1024 / 1024 / 1024)} G / {round(sysStat.memory.total / 1024 / 1024 / 1024)} G</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>Uptime</Accordion.Header>
          <Accordion.Body>
            <p>{parseInt(sysStat.uptime/60)} mins {sysStat.uptime%60} secs</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default SysStat;