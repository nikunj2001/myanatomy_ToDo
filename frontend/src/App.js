import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router,Switch,Route,withRouter} from "react-router-dom";
import EditTask from './components/EditTask';
import Nav from './components/Nav';
import { Provider, useDispatch,connect } from 'react-redux';
import Store from './store';
import PrivateRoutesForLoggedOut from './privateRoutes/PrivateRoutesForLoggedOut';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PrivateRoutesForLoggedInUser from './privateRoutes/PrivateRoutesForLoggedInUser';
function App() {
  return (
    <Router>
      <Nav/>
    <Switch>
        <PrivateRoutesForLoggedOut path="/" exact component={LoginForm} />
        <PrivateRoutesForLoggedOut path="/register" exact component={RegisterForm} />
        <PrivateRoutesForLoggedInUser path="/dashboard" component={Home} exact />
        <PrivateRoutesForLoggedInUser path="/editTask" exact component={EditTask} />
    </Switch>    
  </Router>
  );
}
const ReduxApp = connect(null,null)(App)
export default withRouter(ReduxApp);