import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Shutdown = ({url}) => {
  function handleClick() {
    const url_get = `${url.origin}/plugin/shutdown`;
    axios.get(url_get)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <>
      <h1>Shutdown</h1>
      <Button variant="dark" onClick={handleClick}>Server</Button>
    </>
  );
};

export default Shutdown;