import { initialOrganization, employees } from "../../data/data";
const employeesReducer = (
  state = { selectedEmployee: 1, organization: initialOrganization, employees },
  action
) => {
  switch (action.type) {
    case "SELECT_EMPLOYEE":
      return Object.assign({}, state, { selectedEmployee: +action.positionId });
    default:
      return state;
  }
};

export default employeesReducer;
