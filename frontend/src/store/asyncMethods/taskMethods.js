import axios from "axios";

const tokenPresent=()=>{
    const token =localStorage.getItem('token');
    if(token) return true;
    return false;
}

// export const fetchTasks=()=>{
//     return async(dispatch,getState)=>{
//          const {
// 			AuthReducer: { token }
//         }=getState();
//         const config = {
// 			headers: {
//                 Authorization : `Bearer ${token}`
// 			},
// 		};
//         dispatch({type:"SET_LOADER"});
//         try {
//             const response = await axios.get("getTasks",config);
//             dispatch({type:"SET_DATA",payload:response.data.tasks});
//             dispatch({type:"CLOSE_LOADER"});
//         } catch (error) {
//         dispatch({type:"CLOSE_LOADER"});
//         console.log(error);
//         }
//     }
// }
export const createTask=(taskData,userId)=>{
    return async(dispatch,getState)=>{
         const {
			AuthReducer: { token }
        }=getState();
        const config = {
			headers: {
                Authorization : `Bearer ${token}`
			},
		};
        dispatch({type:"SET_LOADER"});
        try {
            taskData['userId']=userId;
            const response = await axios.post("uploadTask",taskData,config);
            dispatch({type:"SET_TASK",payload:"new task"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
        console.log(error);
        }
    }
}
export const deleteTask=(id)=>{
    return async(dispatch,getState)=>{
        if(!tokenPresent()){
            dispatch({type:"LOGOUT"});
        }
        dispatch({type:"SET_LOADER"});
        try {
             const {
			AuthReducer: { token }
        }=getState();
        const config = {
			headers: {
                // Authorization : `Bearer ${token}`
                Authorization : `Bearer ${localStorage.getItem('token')}`
			},
		};
            const response = await axios.delete(`deleteTask/${id}`,config);
            dispatch({type:"SET_DELETE",payload:"delete task"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
            console.log(error);
        }
    }
}
export const editTask=(taskData,id)=>{
    return async(dispatch,getState)=>{
         if(!tokenPresent()){
            dispatch({type:"LOGOUT"});
        }
         const {
			AuthReducer: { token }
        }=getState();
        const config = {
			headers: {
                Authorization : `Bearer ${token}`
			},
		};
        dispatch({type:"SET_LOADER"});
        try {
            const response = await axios.put(`/updateTaskDetails/${id}`,taskData,config);
            console.log(typeof response.data);
            dispatch({type:"SET_TASK",payload:"update task"});
            dispatch({type:"CLOSE_LOADER"});
        } catch (error) {
        dispatch({type:"CLOSE_LOADER"});
        console.log(error.message);
        }
    }
}