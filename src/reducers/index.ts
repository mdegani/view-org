import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import throttle from "lodash/throttle";
import orgReducer from "../org/reducers/org.reducer";
import { OrgState } from "../org/types/org.types";
import { saveState, loadState } from "./local-storage";

const orgViewReducer = combineReducers<{
  orgReducer: OrgState;
}>({
  orgReducer
});

const persistedState = loadState();
export const store = createStore(
  orgViewReducer,
  persistedState,
  applyMiddleware(logger)
);

store.subscribe(
  throttle(() => {
    saveState({ orgReducer: store.getState().orgReducer });
  }, 1000)
);
