import React, { useEffect, useState } from 'react'
import CreateTask from '../CreateTask';
import Nav from '../Nav';
import ViewTask from '../ViewTask/ViewTask';

const Home = () => {
  return (
    <div>
      <CreateTask />
      <ViewTask />
    </div>
  )
}

export default Home;