import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import EditTask from './components/EditTask';
import {Provider} from "react-redux";
import Nav from './components/Nav';
import Store from "./store";
import StatusData from './components/StatusData';
import CreateTask from './components/CreateTask';
function App() {
  return (
    <Provider store={Store}>
    <Nav/>
    <Switch>
    <div className="App">
      <Route path="/editTask" exact component={EditTask} />
      <Route path="/" exact component={Home} />
    </div>
    </Switch>    
    </Provider>
  );
}

export default App;
