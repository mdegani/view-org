import { initialOrganization } from "../../data/data";
import { EmployeesState } from "../organization.types";
import { employeeActions } from "../actions";
const employeesReducer = (
  state: EmployeesState = {
    selectedEmployee: 1,
    organization: initialOrganization,
    showModal: false
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
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: action.payload
      };
    default:
      return state;
  }
};

export default employeesReducer;
