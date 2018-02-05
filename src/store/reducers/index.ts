import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import employeesReducer from "./employees";
import { EmployeesState } from "../organization.types";

const orgViewApp = combineReducers<{
  employeesReducer: EmployeesState;
}>({
  employeesReducer,
  router: routerReducer
});

export default orgViewApp;
