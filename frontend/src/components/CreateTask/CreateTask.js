import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createTask } from '../../store/asyncMethods/taskMethods';
import { Toaster, toast } from "react-hot-toast"
import Store from "../../store"
const CreateTask = () => {
    const { user } = Store.getState().AuthReducer;
    const [state, setState] = useState({
        task: '',
        description: '',
        status: 'pending',
    });
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const submitForm = e => {
        e.preventDefault();
        if (state.task === '') {
            toast.error('Task is required!')
        } else {
            Store.dispatch(createTask(state, user._id));
            setState({
                task: '',
                description: '',
                status: 'pending',
            })
        }
    }
    const statusChange = e => {
        setState({ ...state, status: e.currentTarget.value });
    }
    return (
        <div className='form' id='create-form'>
            <form onSubmit={submitForm} >
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div data-testid="todo-1" className="form__control">
                    <input value={state.task} onChange={handleChange} type="text" name='task' placeholder='Add a Task...' />
                </div>
                <div className="form__control">
                    <input type="text" name='description' value={state.description} onChange={handleChange} placeholder='Description' />
                </div>
                <div className="form__control">
                    <select name="status" id='status' value={state.status} onChange={statusChange}>
                        <option value="pending">Pending</option>
                        <option value="under-process">Under Process</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form__control">
                    <input type='submit' className='btn btn-default' id='submit-btn' value='Add Task' />
                </div>
            </form>
        </div>
    )
}

export default CreateTask;