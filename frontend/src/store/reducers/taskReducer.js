const initState={
    loading:false,
    task:'',
    tasks:false,
};


const TaskReducer=(state=initState,action)=>{
    if(action.type==="SET_LOADER"){
        return {...state,loading:true};
    }
    else if(action.type==="CLOSE_LOADER"){
        return {...state,loading:false};
    }
    else if(action.type==="SET_TASK"){
        return {...state,task:action.payload};
    }
    else if(action.type==="UNSET_TASK"){
        return {...state,task:""};
    }
    return state;
}
export default TaskReducer;