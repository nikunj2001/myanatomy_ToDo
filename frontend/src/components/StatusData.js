import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {BsFillPenFill,BsTrash} from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../store/asyncMethods/taskMethods';
import PropTypes from "prop-types";
const StatusData = ({status}) => {
    const active="active"
       const [data,setData] =useState([]);
     const history = useHistory();
    const dispatch = useDispatch();
    const {task}=useSelector(state=>state.TaskReducer);
    useEffect(async()=>{
        const response =await axios.get(`http://127.0.0.1:5000/statusTask?status=${status}`);
        setData(response.data.tasks);
        console.log(response);
    },[]);
    useEffect(async()=>{
        if(task){
            const response =await axios.get(`http://127.0.0.1:5000/statusTask?status=${status}`);
            setData(response.data.tasks);
            dispatch({type:"UNSET_TASK"});
        }
    },[task]);
    useEffect(async()=>{
            const response =await axios.get(`http://127.0.0.1:5000/statusTask?status=${status}`);
            setData(response.data.tasks);
            dispatch({type:"UNSET_TASK"});
    },[status]);
    const clickEdit=(task)=>{
    history.push({
        pathname:"/editTask",
        state:{task:task}
    });
}
const deleteClick=(task)=>{
        dispatch(deleteTask(task._id));
}
  return (      
    <>
     <div className="task-detail">
                {
                    !data.length>0?"No Task":
                    <table border='1' cellPadding='5' cellSpacing='5' width="75%" >
                        <tr>
                           <th>Task</th>
                           <th>Description </th>
                           <th>Status</th>         
                           <th>Change Status</th>         
                        </tr>          
                    {data.map(task=>(
                        <tr>
                            <td>{task.task}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td><button onClick={clickEdit.bind(this,task)} className='btn' ><BsFillPenFill className='btns' /></button><button className='btn' onClick={deleteClick.bind(this,task)} ><BsTrash className='btns' /></button></td>
                        </tr>
                    ))
            }
                    </table>
                }
            </div>
    </>
  )     
}
StatusData.prototype={
    status:PropTypes.string
}

export default StatusData       