import React from 'react'
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const PrivateRoutesForLoggedOut = (props) => {
    const { user } = useSelector(state => state.AuthReducer);
    return !user ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/dashboard" />
    )
}

export default PrivateRoutesForLoggedOut