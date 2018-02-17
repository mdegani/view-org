import { combineReducers } from "redux";
import employeesReducer from "./org.reducer";
import { EmployeesState } from "../../org/types/org.types";

const orgViewApp = combineReducers<{
  employeesReducer: EmployeesState;
}>({
  employeesReducer
});

export default orgViewApp;
