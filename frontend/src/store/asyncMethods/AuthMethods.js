import axios from "axios";



export const userRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        dispatch({ type: "SET_LOADER" });
        try {
            const { data } = await axios.post("http://127.0.0.1:5000/registerUser", state, config);
            if ('errors' in data) {
                dispatch({ type: "SET_REGISTER_ERRORS", payload: data.errors });
                dispatch({ type: "SET_MESSAGE", payload: data.msg });
                dispatch({ type: "CLOSE_LOADER" });
            } else {
                localStorage.setItem("token", data.token);
                dispatch({ type: "SET_TOKEN", payload: data.token })
            }
            dispatch({ type: "CLOSE_LOADER" });
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" });
            console.log(error);
        }
    }
}
export const userLogin = (state) => {
    console.log(state);
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        dispatch({ type: "SET_LOADER" });
        try {
            const response = await axios.post("http://127.0.0.1:5000/loginUser", state, config);
            const { data } = response;
            if ('errors' in data) {
                dispatch({ type: "SET_LOGIN_ERRORS", payload: data.errors });
                dispatch({ type: "SET_MESSAGE", payload: data.msg });
            } else {
                localStorage.setItem("token", data.token);
                dispatch({ type: "SET_TOKEN", payload: data.token })
            }
            dispatch({ type: "CLOSE_LOADER" });
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" });
            console.log(error.message);
        }
    }
}

export const fetchData = () => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        dispatch({ type: "SET_LOADER" });
        try {
            const { data } = await axios.get("http://127.0.0.1:5000/getData", config);
            if ('errors' in data) {
                dispatch({ type: "SET_MESSAGE", payload: data.msg });
            } else {
                dispatch({ type: "SET_DATA", payload: data });
            }
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" });
            console.log(error);
        }
    }
}