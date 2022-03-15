import React from 'react'
import { useState } from 'react';
import {useDispatch} from "react-redux";
import { createTask } from '../store/asyncMethods/taskMethods';
const CreateTask = () => {
    const dispatch = useDispatch();
    const [state,setState] = useState({
        task:'',
        description:'',
        status:'pending'
    });
    const handleChange=e=>{
        setState({...state,[e.target.name]:e.target.value});
    }
    const submitForm=e=>{
        e.preventDefault();
       dispatch(createTask(state));
       setState({
            task:'',
        description:'',
        status:'pending'
       })
    }
    const statusChange=e=>{
        setState({...state,status:e.currentTarget.value});
    }
  return (
    <div className='form'>
        <form onSubmit={submitForm} >
           <div data-testid="todo-1" className="form__control">
            <input required value={state.task} onChange={handleChange} type="text" name='task' placeholder='Add a Task...' />    
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
                     <input type='submit' className='btn btn-default' value='Add Task' />
                </div>         
        </form>    
    </div>
  )
}

export default CreateTask;