import React from 'react'
import "../style.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../store/asyncMethods/AuthMethods';
const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.AuthReducer);
  const handleLogout = e => {
    dispatch(userLogout());
  }
  return (
    <div className='nav'>
      <div className="nav-left">
        <ul>
          <li>To-Do List</li>
        </ul>
      </div>
      <div className='nav-right' >
        <ul>
          {
            user ? (
              <>
                <li>
                  {user.name}
                </li>
                <li onClick={handleLogout} >
                  Logout
                </li>
              </>
            ) :
              (
                <>
                  <Link to="/" >Login</Link>
                  <Link to='/register' >Register</Link>
                </>
              )
          }

        </ul>
      </div>
    </div>
  )
}

export default Nav