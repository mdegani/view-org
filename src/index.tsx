import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Provider as RebassProvider } from "rebass";
import { store } from "./reducers";
import "./index.css";
import App from "./app.component";

ReactDOM.render(
  <Provider store={store}>
    <RebassProvider>
      <App />
    </RebassProvider>
  </Provider>,
  document.getElementById("root")
);
