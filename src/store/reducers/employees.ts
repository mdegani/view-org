import { EmployeesState } from "../organization.types";
import { employeeActions } from "../actions";

const initialState = {
  selectedEmployee: 1,
  organization: [
    {
      positionId: 1,
      supervisorPositionId: 0,
      employeeId: 101,
      employeeName: "Mr. Big, CEO"
    }
  ]
};

const employeesReducer = (
  state: EmployeesState = initialState,
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
    case "DELETE_ALL_EMPLOYEES":
      return initialState;
    default:
      return state;
  }
};

export default employeesReducer;
