import jwt_decode from "jwt-decode";
const initState = {
    loading: "",
    registerErrors: [],
    loginErrors: [],
    token: '',
    user: '',
    data: [],
    isAuthenticated: false
}
const verifyToken = token => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
        localStorage.removeItem("token");
        return null;
    } else {
        return decodeToken;
    }
}
const token = localStorage.getItem("token");
if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
        initState.token = token;
        initState.isAuthenticated = true;
        const { user } = decoded;
        initState.user = user;
    }
}
const AuthReducer = (state = initState, action) => {
    const { type, payload } = action;
    if (type === "SET_LOADER") {
        return { ...state, loading: true };
    } else if (type === "CLOSE_LOADER") {
        return { ...state, loading: false };
    } else if (type === "SET_REGISTER_ERRORS") {
        return { ...state, registerErrors: payload }
    } else if (type === "CLOSE_REGISTER_ERRORS") {
        return { ...state, registerErrors: [] }
    } else if (type === "SET_LOGIN_ERRORS") {
        return { ...state, loginErrors: payload }
    } else if (type === "CLOSE_LOGIN_ERRORS") {
        return { ...state, loginErrors: [] }
    } else if (type === "SET_TOKEN") {
        const decoded = verifyToken(payload);
        const { user } = decoded;
        return {
            ...state,
            token: payload,
            isAuthenticated: true,
            user: user,
            loginErrors: [],
            registerError: []
        };
    } else if (type === "CLEAR_TOKEN") {
        localStorage.getItem("token");
        return {
            ...state,
            token: payload,
            isAuthenticated: true,
            user: '',
            loginErrors: [],
            registerError: []
        };
    }
    else if (action.type === "LOGOUT") {
        localStorage.removeItem("token");
        return { ...state, token: '', user: '', isAuthenticated: false };
    }
    else if (action.type === "SET_DATA") {
        return { ...state, data: payload.data };
    } else {
        return state;
    }
}
export default AuthReducer;