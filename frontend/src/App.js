import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import EditTask from './components/EditTask';
import Nav from './components/Nav';
import { connect } from 'react-redux';
import PrivateRoutesForLoggedOut from './privateRoutes/PrivateRoutesForLoggedOut.js';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js';
import PrivateRoutesForLoggedInUser from './privateRoutes/PrivateRoutesForLoggedInUser.js';
import { useEffect } from 'react';
import Store from './store';
function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <PrivateRoutesForLoggedOut path="/" exact component={LoginForm} />
        <PrivateRoutesForLoggedOut path="/register" exact component={RegisterForm} />
        <PrivateRoutesForLoggedInUser path="/dashboard" component={Home} exact />
        <PrivateRoutesForLoggedInUser path="/editTask" exact component={EditTask} />
      </Switch>
    </Router>
  );
}
export default App;