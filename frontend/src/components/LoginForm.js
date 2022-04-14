import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { userLogin } from '../store/asyncMethods/AuthMethods';
import { Toaster, toast } from "react-hot-toast"
import Store from '../store/'

const LoginForm = () => {
    console.log();
    const [state, setState] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const { loginErrors } = Store.getState().AuthReducer;
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const handleSubmit = e => {
        e.preventDefault();
        Store.dispatch(userLogin(state));
    }
    useEffect(() => {
        if (loginErrors.length > 0) {
            loginErrors.map(err => toast.error(err.msg))
            dispatch({ type: "CLOSE_LOGIN_ERRORS" })
        }
    }, [loginErrors]);
    return (
        <div className='form' >
            <h1>Login Form</h1>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Email' name='email' onChange={handleChange} />
                <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                <input type="submit" placeholder='Login' />
            </form>
        </div>
    )
}

export default LoginForm