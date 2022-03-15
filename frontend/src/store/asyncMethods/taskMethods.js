import axios from "axios";



export const createTask=(taskData)=>{
    return async(dispatch)=>{
        dispatch({type:"SET_LOADER"});
        try {
            const response = await axios.post("http://127.0.0.1:5000/uploadTask",taskData);
            dispatch({type:"SET_TASK",payload:"new task"});
            dispatch({type:"CLOSE_LOADER"});
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
            const response = await axios.delete(`http://127.0.0.1:5000/deleteTask/${id}`);
            console.log(response);
            dispatch({type:"SET_TASK",payload:"delete task"});
            dispatch({type:"CLOSE_LOADER"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
            console.log(error);
        }
    }
}
export const editTask=(taskData,id)=>{
    console.log();
    return async(dispatch)=>{
        dispatch({type:"SET_LOADER"});
        try {
            const response = await axios.put(`/updateTaskDetails/${id}`,taskData);
            console.log(response);
            dispatch({type:"SET_TASK",payload:"update task"});
            dispatch({type:"CLOSE_LOADER"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
            console.log(error);
        }
    }
}