import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import EditTask from './components/EditTask';
import Nav from './components/Nav';
import StatusData from './components/StatusData';
import CreateTask from './components/CreateTask';
function App() {
  return (
    <>
    <Nav/>
    <Switch>
    <div className="App">
      <Route path="/editTask" exact component={EditTask} />
      <Route path="/" exact component={Home} />
    </div>
    </Switch>    
    </>
  );
}

export default App;
