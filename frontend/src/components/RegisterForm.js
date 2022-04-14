import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from '../store/asyncMethods/AuthMethods';
import { Toaster, toast } from "react-hot-toast";
const RegisterForm = () => {
    const dispatch = useDispatch();
    const { registerErrors } = useSelector(state => state.AuthReducer);
    const [state, setState] = useState({ name: '', email: '', password: '' })
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(userRegister(state));
    }
    useEffect(() => {
        if (registerErrors.length > 0) {
            console.log("Inside");
            registerErrors.map(err => toast.error(err.msg))
            dispatch({ type: "CLOSE_REGISTER_ERRORS" })
        }
    }, [registerErrors])
    return (
        <div className='form' >
            <h1>Register Form</h1>
            <Toaster position="top-center" reverseOrder={false} />
            <form onSubmit={handleSubmit}>
                <input type="text" name='name' onChange={handleChange} placeholder='Enter your Name' />
                <input type="text" name='email' placeholder='Enter your Email' onChange={handleChange} />
                <input type="password" name='password' placeholder='Enter your Password' onChange={handleChange} />
                <input type="submit" placeholder='Register' />
            </form>
        </div>
    )
}

export default RegisterForm