import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../store/asyncMethods/taskMethods';
import {BsFillPenFill,BsTrash} from "react-icons/bs";
import {useHistory} from "react-router-dom";
import StatusData from './StatusData';
import AllData from './AllData';
const ViewTask =() => {
    const [editTask,setEditTask] = useState(false);
    const [data,setData] = useState([]);
    const [active,setActive] = useState("All Task");
    const history = useHistory();
    const {task}=useSelector(state=>state.TaskReducer);
const clickEdit=(task)=>{
    setEditTask(true);
    history.push({
        pathname:"/editTask",
        state:{task:task}
    });
}
const completeClick=(status)=>{
        setActive("completed")
}
const underProcessClick=(status)=>{
        setActive("under-process")
}
const pendingClick=(status)=>{
        setActive("pending")
}
const allTaskClick=(status)=>{
        setActive("All Task")
}

  return (
      <div className='tasks'>         
        <div className='task_heading' ><h1>Your Tasks</h1></div>
        <div className="task-details">
            <div className='tempNav' >
                <ul className='nav-ul'>
                    <li className={active==="All Task"?"active":""} onClick={allTaskClick} >
                        All Task
                    </li>
                    <li className={active==="pending"?"active":""} onClick={pendingClick} >
                        Pending
                    </li>
                    <li className={active==="under-process"?"active":""} onClick={underProcessClick} >
                        Under Process
                    </li>
                    <li className={active==="completed"?"active":""} onClick={completeClick}>
                        Completed
                    </li>
                </ul>
            </div>
            {active==="All Task"?
                <AllData/>:
                <>
                <StatusData status={active} />  
                </>
        }
        </div>
      </div>
  )
}

export default ViewTask;