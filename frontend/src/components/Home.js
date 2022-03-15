import React, { useEffect, useState } from 'react'
import CreateTask from './CreateTask';
import Nav from './Nav';
import ViewTask from './ViewTask';
import { useDispatch,useSelector } from 'react-redux';
import { getTask } from '../store/asyncMethods/taskMethods';
const Home = () => {
  const [task,setTask] = useState([]);
  const {tasks} = useSelector(state=>state.TaskReducer); 
  return (
    <>
        <CreateTask/>
        <ViewTask/>
    </>
  )
}

export default Home;