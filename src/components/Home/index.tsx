import React from 'react';
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <NavLink to={`/table-points`}>Point table</NavLink>
      <br />
      <NavLink to={`/edit-business`}>Edit business</NavLink>
    </>
  );
};

export default Home;
