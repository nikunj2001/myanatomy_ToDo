import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import TaskReducer from "./reducers/taskReducer";
import AuthReducer from "./reducers/AuthReducer.js";
const rootReducers = combineReducers({
        TaskReducer, AuthReducer
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers,
        composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;