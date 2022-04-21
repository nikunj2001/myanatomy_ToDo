import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { BsFillPenFill, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../store/asyncMethods/taskMethods';
import Store from '../../store';
const StatusData = (props) => {
    console.log(props);
    const active = "active"
    const [data, setData] = useState([]);
    const history = useHistory();
    const { task, deleteT } = Store.getState().TaskReducer;

    useEffect(async () => {
        const trying = props.data.filter(t => t.status === props.status);
        setData(trying);
    }, [task, deleteT, props.status]);

    const clickEdit = (task) => {
        history.push({
            pathname: "/editTask",
            state: { task: task }
        });
    }
    const deleteClick = (task) => {
        Store.dispatch(deleteTask(task._id));
    }
    return (
        <>
            <div className="task-detail">
                {
                    !data.length > 0 ? "No Task" :
                        <table border='1' cellPadding='5' cellSpacing='5' width="75%" >
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Description </th>
                                    <th>Status</th>
                                    <th>Change Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(task => (
                                    task.status === props.status ?
                                        <tr key={task._id} >
                                            <td>{task.task}</td>
                                            <td>{task.description}</td>
                                            <td>{task.status}</td>
                                            <td><button onClick={clickEdit.bind(this, task)} className='btn' ><BsFillPenFill className='btns' /></button><button className='btn' onClick={deleteClick.bind(this, task)} ><BsTrash className='btns' /></button></td>
                                        </tr> : ""
                                ))
                                }
                            </tbody>
                        </table>
                }
            </div>
        </>
    )
}


export default StatusData;       