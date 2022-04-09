import React from "react";
import renderer from "react-test-renderer";
import {render} from "@testing-library/react";
import Home from "./Home";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App"
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";

describe("with React Teting Library",()=>{
    // const mockStore = configureStore();
    // let store;
    // it('has two components', () => {
    // store = mockStore();
    // const { task } = render(
    //         <Provider store={store}>
    //             <App />
    //         </Provider>
    //     );
  const tree = renderer.create(<Home/>).toJSON();
  expect(tree).toMatchSnapshot();
});


