import { initialOrganization } from "../../data/data";
import { EmployeesState } from "../organization.types";
const employeesReducer = (
  state: EmployeesState = {
    selectedEmployee: 1,
    organization: initialOrganization
  },
  action
): EmployeesState => {
  switch (action.type) {
    case "SELECT_EMPLOYEE":
      return Object.assign({}, state, { selectedEmployee: +action.positionId });
    default:
      return state;
  }
};

export default employeesReducer;
