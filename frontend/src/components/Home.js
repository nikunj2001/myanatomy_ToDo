import React, { useEffect, useState } from 'react'
import CreateTask from './CreateTask';
import Nav from './Nav';
import ViewTask from './ViewTask';

const Home = () => {
  return (
    <>
        <CreateTask/>
        <ViewTask/>
    </>
  )
}

export default Home;