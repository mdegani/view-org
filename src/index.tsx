import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import orgViewApp from "./store/reducers";
import throttle from "lodash/throttle";
import { saveState, loadState } from "./localStorage";
import "./index.css";
import App from "./App";

const persistedState = loadState();
const store = createStore(orgViewApp, persistedState);

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
