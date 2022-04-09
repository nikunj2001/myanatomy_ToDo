import axios from "axios";

export const fetchTasks=()=>{
    return async(dispatch)=>{
        dispatch({type:"SET_LOADER"});
        try {
            const response = await axios.get("getTasks");
            dispatch({type:"SET_DATA",payload:response.data.tasks});
            dispatch({type:"CLOSE_LOADER"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
        console.log(error);
        }
    }
}
export const createTask=(taskData)=>{
    return async(dispatch)=>{
        dispatch({type:"SET_LOADER"});
        try {
            const response = await axios.post("uploadTask",taskData);
            dispatch({type:"SET_TASK",payload:"new task"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
        console.log(error);
        }
    }
}
export const deleteTask=(id)=>{
    return async(dispatch)=>{
        dispatch({type:"SET_LOADER"});
        try {
            const response = await axios.delete(`deleteTask/${id}`);
            dispatch({type:"SET_DELETE",payload:"delete task"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
            console.log(error);
        }
    }
}
export const editTask=(taskData,id)=>{
    return async(dispatch)=>{
        dispatch({type:"SET_LOADER"});
        try {
            const response = await axios.put(`/updateTaskDetails/${id}`,taskData);
            console.log(typeof response.data);
            dispatch({type:"SET_TASK",payload:"update task"});
            dispatch({type:"CLOSE_LOADER"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
        console.log(error.message);
        }
    }
}