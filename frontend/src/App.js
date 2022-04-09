import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import EditTask from './components/EditTask';
import Nav from './components/Nav';
import { Provider, useDispatch } from 'react-redux';
import Store from './store';
function App() {
  const dispatch = useDispatch();
  return (
    <Router>
      <Nav/>
    <Switch>
        <Route path="/editTask" exact component={EditTask} />
        <Route path="/" exact component={Home} />
    </Switch>    
  </Router>
  );
}
export default App;
