import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import StatusData from './StatusData';
import AllDataC from './AllData/';
import { userLogout } from "../store/asyncMethods/AuthMethods"
import { toast, Toaster } from "react-hot-toast";
const ViewTask = () => {
    const [editTask, setEditTask] = useState(false);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [active, setActive] = useState("All Task");
    const history = useHistory();
    const { task, deleteT, errors } = useSelector(state => state.TaskReducer);
    const { token, user } = useSelector(state => state.AuthReducer);
    useEffect(async () => {
        if (!localStorage.getItem("token")) {
            return dispatch(userLogout());
        }
        try {
            const res = await axios.get(`/getTasks/${user._id}`);
            setData(res.data.tasks);
        } catch (error) {
            toast.error("Please Login Again");
            dispatch({ type: "CLEAR_TOKEN" });
        }

    }, []);
    useEffect(async () => {
        if (!localStorage.getItem("token")) {
            return dispatch(userLogout());
        }
        if (deleteT) {
            const res = await axios.get(`/getTasks/${user._id}`);
            setData(res.data.tasks);
            dispatch({ type: "UNSET_DELETE" });
            dispatch({ type: "CLOSE_LOADER" });
        }
        if (task) {
            const res = await axios.get(`/getTasks/${user._id}`);
            setData(res.data.tasks);
            dispatch({ type: "UNSET_TASK" });
            dispatch({ type: "CLOSE_LOADER" });
        }
        if (errors.length > 0) {
            errors.map(err => toast.error(err.msg))
            dispatch({ type: "CLOSE_TASK_ERRORS" })
        }
    }, [deleteT, task, errors]);


    const taskClick = (type) => {
        setActive(type)
    }
    return (
        <div className='tasks'>
            <div className='task_heading' ><h1>Your Tasks</h1></div>
            <div className="task-details">
                <Toaster position="top-center" reverseOrder={false} />
                <div className='tempNav' >
                    <ul className='nav-ul'>
                        <li className={active === "All Task" ? "active" : ""} onClick={() => taskClick("All Task")} >
                            All Task
                        </li>
                        <li className={active === "pending" ? "active" : ""} onClick={() => taskClick("pending")} >
                            Pending
                        </li>
                        <li className={active === "under-process" ? "active" : ""} onClick={() => taskClick("under-process")} >
                            Under Process
                        </li>
                        <li className={active === "completed" ? "active" : ""} onClick={() => taskClick("completed")}>
                            Completed
                        </li>
                    </ul>
                </div>
                {active === "All Task" ?
                    <AllDataC
                        data={data}
                    /> :
                    <StatusData status={active}
                        data={data}
                    />
                }
            </div>
        </div>
    )
}
export default ViewTask;