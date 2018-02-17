import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import orgViewApp from "./org/reducers";
import throttle from "lodash/throttle";
import { saveState, loadState } from "./localStorage";
import "./index.css";
import App from "./App";

const persistedState = loadState();
const store = createStore(orgViewApp, persistedState, applyMiddleware(logger));

store.subscribe(
  throttle(() => {
    saveState({ employeesReducer: store.getState().employeesReducer });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
