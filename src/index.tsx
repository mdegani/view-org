import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";
import {
  ConnectedRouter,
  routerMiddleware
  // push
} from "react-router-redux";
import logger from "redux-logger";
import orgViewApp from "./store/reducers";
import throttle from "lodash/throttle";
import { saveState, loadState } from "./localStorage";
import "./index.css";
import App from "./App";

const history = createHistory();
let middleware = [routerMiddleware(history)];

if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, logger];
}

const persistedState = loadState();
const store = createStore(
  orgViewApp,
  persistedState,
  applyMiddleware(...middleware)
);

store.subscribe(
  throttle(() => {
    saveState({ employeesReducer: store.getState().employeesReducer });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/:nodeId?" component={App} />
        {/* <Route path="/about" component={About}/> */}
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
