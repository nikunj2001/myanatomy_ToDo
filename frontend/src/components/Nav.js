import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
const Nav = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.AuthReducer);
  const handleLogout=e=>{
    dispatch({type:"LOGOUT"});
    localStorage.removeItem("token");
}
  return (
    <div className='nav'>
        <ul>
            <li>
                To-Do List
            </li>
             {
                  user?(
                      <>
                <li onClick={handleLogout} > 
                    Logout
              </li>
              </>
                  ):
                  (
                      <>
                <Link to="/" >Login</Link>
              <Link to='/register' >Register</Link>
                      </>
                  )
              }
             
        </ul>
    </div>
  )
}

export default Nav