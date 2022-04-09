import React,{useEffect, useState} from 'react'
import { ReactPropTypes } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { editTask } from '../store/asyncMethods/taskMethods';
import { useHistory } from 'react-router-dom';
import { Toaster,toast } from 'react-hot-toast';
const EditTask = ({location}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [state,setState] = useState({
        task: location.state.task.task,
        description: location.state.task.description,
        status: location.state.task.status
    });
    const {task} = useSelector(state=>state.TaskReducer);
    const handleChange=e=>{
        setState({...state,[e.target.name]:e.target.value});
    }
    const updateForm=e=>{
        e.preventDefault();
        if(state.task===""){
            toast.error("Task is required!");
        }
       dispatch(editTask(state,location.state.task._id));
    }
    const statusChange=e=>{
        setState({...state,status:e.currentTarget.value});
    }
    useEffect(()=>{
            if(task){
                history.push("/");
                dispatch({type:"UNSET_TASK"});
            }
    },[task]);
  return (
    <div className='form'>
        <form onSubmit={updateForm} >
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
           <div className="form__control">
            <input  value={state.task} onChange={handleChange} type="text" name='task' placeholder='Add a Task...' />    
               </div> 
               <div className="form__control">
                 <input type="text" name='description' value={state.description} onChange={handleChange} placeholder='Description' />    
                </div>
                <div  className="form__control">
                    <select name="status" value={state.status} onChange={statusChange}>
                        <option value="pending">Pending</option>    
                        <option value="under-process">Under Process</option>    
                        <option value="completed">Completed</option>    
                    </select>  
                </div>
                 <div className="form__control">
                     <input type='submit' className='btn btn-default' value='Update Task' />
                </div>         
        </form>    
    </div>
  )
}
export default EditTask;