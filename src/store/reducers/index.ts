import { combineReducers } from "redux";
import employeesReducer from "./employees";
import { EmployeesState } from "../organization.types";

const orgViewApp = combineReducers<{
  employeesReducer: EmployeesState;
}>({
  employeesReducer
});

export default orgViewApp;
