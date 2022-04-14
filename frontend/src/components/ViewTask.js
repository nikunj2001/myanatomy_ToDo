import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../store/asyncMethods/taskMethods';
import {BsFillPenFill,BsTrash} from "react-icons/bs";
import {useHistory} from "react-router-dom";
import StatusData from './StatusData';
import AllDataC from './AllDataC';
import Store from "../store/"
const ViewTask =() => {
    const [editTask,setEditTask] = useState(false);
    const [data,setData] = useState([]);
    const dispatch = useDispatch();
    const [active,setActive] = useState("All Task");
    const history = useHistory();
    const {task,deleteT}=useSelector(state=>state.TaskReducer);
    const {token,user} = useSelector(state=>state.AuthReducer);
    const config = {
			headers: {
                Authorization : `Bearer ${token}`
			},
		};
       
useEffect(async()=>{
     if(localStorage.getItem("token")===null){
         dispatch({type:"LOGOUT"})
     } 
    const res=await axios.get(`/getTasks/${user._id}`,config);
    setData(res.data.tasks);
},[]);
useEffect(async()=>{
     if(localStorage.getItem("token")===null){
         dispatch({type:"LOGOUT"})
     } 
    if(deleteT){
        const res=await axios.get(`/getTasks/${user._id}`,config);
        setData(res.data.tasks);
        dispatch({type:"UNSET_DELETE"});
        dispatch({type:"CLOSE_LOADER"});
    }
    if(task){
        const res=await axios.get(`/getTasks/${user._id}`,config);
        setData(res.data.tasks);
        dispatch({type:"UNSET_TASK"});
        dispatch({type:"CLOSE_LOADER"});
    }
},[deleteT,task]);


const taskClick=(type)=>{
    setActive(type)
}
  return (
      <div className='tasks'>         
        <div className='task_heading' ><h1>Your Tasks</h1></div>
        <div className="task-details">
            <div className='tempNav' >
                <ul className='nav-ul'>
                    <li className={active==="All Task"?"active":""} onClick={()=>taskClick("All Task")} >
                        All Task
                    </li>
                    <li className={active==="pending"?"active":""} onClick={()=>taskClick("pending")} >
                        Pending
                    </li>
                    <li className={active==="under-process"?"active":""} onClick={()=>taskClick("under-process")} >
                        Under Process
                    </li>
                    <li className={active==="completed"?"active":""} onClick={()=>taskClick("completed")}>
                        Completed
                    </li>
                </ul>
            </div>
            {active==="All Task"?
                <AllDataC 
                data={data}
                 />:
                <StatusData status={active}
                 data={data} 
                 />  
            }
        </div>
      </div>
  )
}
export default ViewTask;