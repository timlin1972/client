import React from 'react';

const About = ({url}) => {
  return (
    <>
      <h1>About</h1>
      <p>IP address: {url.host}</p>
    </>
  );
};

export default About;