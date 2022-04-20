import axios from "axios";

// axios.defaults.withCredentials = true

export const userRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        dispatch({ type: "SET_LOADER" });
        try {
            const { data } = await axios.post("http://localhost:5000/registerUser", state, config);
            localStorage.setItem("isAuthenticated", true);
            dispatch({ type: "SET_TOKEN", payload: data.token })
            dispatch({ type: "CLOSE_LOADER" });
        } catch (error) {
            dispatch({ type: "SET_REGISTER_ERRORS", payload: error.response.data.errors });
            dispatch({ type: "CLOSE_LOADER" });
        }
    }
}
export const userLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        dispatch({ type: "SET_LOADER" });
        try {
            const response = await axios.post("http://localhost:5000/loginUser", state, config);
            const { data } = response;
            localStorage.setItem("token", data.token);
            dispatch({ type: "SET_TOKEN", payload: data.token })
            dispatch({ type: "CLOSE_LOADER" });
        } catch (error) {
            dispatch({ type: "SET_LOGIN_ERRORS", payload: error.response.data.errors });
            dispatch({ type: "CLOSE_LOADER" });
        }
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: "SET_LOADER" });
            // localStorage.removeItem("token");
            await axios.get("http://localhost:5000/logout");
            dispatch({ type: "LOGOUT" });
            dispatch({ type: "CLOSE_LOADER" })
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" });
            console.log(error);
        }
    }
}