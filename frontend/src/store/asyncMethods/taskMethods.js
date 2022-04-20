import axios from "axios";
import { userLogout } from "./AuthMethods";

axios.defaults.withCredentials = true;
const tokenExists = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return true;
    } else {
        return false;
    }
}

export const createTask = (taskData, userId) => {
    return async (dispatch, getState) => {
        if (!tokenExists()) {
            return dispatch(userLogout());
        }
        dispatch({ type: "SET_LOADER" });
        try {
            taskData['userId'] = userId;
            await axios.post("uploadTask", taskData);
            dispatch({ type: "SET_TASK", payload: "new task" });
        } catch (error) {
            dispatch({ type: "SET_TASK_ERRORS", payload: error.response.data.errors });
            dispatch({ type: "CLOSE_LOADER" });
        }
    }
}
export const deleteTask = (id) => {
    return async (dispatch, getState) => {
        if (!tokenExists()) {
            return dispatch(userLogout());
        }
        dispatch({ type: "SET_LOADER" });
        try {
            await axios.delete(`deleteTask/${id}`);
            dispatch({ type: "SET_DELETE", payload: "delete task" });
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" });
        }
    }
}
export const editTask = (taskData, id) => {
    return async (dispatch, getState) => {
        if (!tokenExists()) {
            return dispatch(userLogout());
        }
        dispatch({ type: "SET_LOADER" });
        try {
            await axios.put(`/updateTaskDetails/${id}`, taskData);
            dispatch({ type: "SET_TASK", payload: "update task" });
            dispatch({ type: "CLOSE_LOADER" });
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" });
            console.log(error.message);
        }
    }
}