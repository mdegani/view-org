import { EmployeesState } from "../organization.types";
import { employeeActions } from "../actions";
const employeesReducer = (
  state: EmployeesState = {
    selectedEmployee: 1,
    organization: [
      {
        positionId: 1,
        supervisorPositionId: 0,
        employeeId: 101,
        employeeName: "Mr. Big, CEO"
      }
    ]
  },
  action: employeeActions
): EmployeesState => {
  switch (action.type) {
    case "SELECT_EMPLOYEE":
      return Object.assign({}, state, { selectedEmployee: +action.positionId });
    case "ADD_EMPLOYEE":
      return {
        ...state,
        organization: [
          ...state.organization,
          {
            positionId: action.payload.positionId,
            supervisorPositionId: action.payload.supervisorId,
            employeeId: action.payload.positionId + 100,
            employeeName: action.payload.employeeName
          }
        ]
      };
    default:
      return state;
  }
};

export default employeesReducer;
