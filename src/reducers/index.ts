import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import throttle from "lodash/throttle";
import employeesReducer from "../org/reducers/org.reducer";
import { EmployeesState } from "../org/types/org.types";
import { saveState, loadState } from "./localStorage";

const orgViewReducer = combineReducers<{
  employeesReducer: EmployeesState;
}>({
  employeesReducer
});

const persistedState = loadState();
export const store = createStore(
  orgViewReducer,
  persistedState,
  applyMiddleware(logger)
);

store.subscribe(
  throttle(() => {
    saveState({ employeesReducer: store.getState().employeesReducer });
  }, 1000)
);
