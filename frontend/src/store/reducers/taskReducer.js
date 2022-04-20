const initState = {
    loading: false,
    task: '',
    tasks: false,
    deleteT: "",
    Data: [],
    errors: []
};


const TaskReducer = (state = initState, action) => {
    if (action.type === "SET_LOADER") {
        return { ...state, loading: true };
    }
    else if (action.type === "CLOSE_LOADER") {
        return { ...state, loading: false };
    }
    else if (action.type === "SET_TASK") {
        return { ...state, task: action.payload };
    }
    else if (action.type === "UNSET_TASK") {
        return { ...state, task: "" };
    }
    else if (action.type === "SET_DELETE") {
        return { ...state, deleteT: action.payload };
    }
    else if (action.type === "SET_DATA") {
        return { ...state, Data: action.payload };
    }
    else if (action.type === "UNSET_DELETE") {
        return { ...state, deleteT: "" };
    } else if (action.type === "SET_TASK_ERRORS") {
        return { ...state, errors: action.payload }
    } else if (action.type === "CLOSE_TASK_ERRORS") {
        return { ...state, errors: [] }
    }
    return state;
}
export default TaskReducer;