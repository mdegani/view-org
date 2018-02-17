import { EmployeesState, FormState } from "../organization.types";
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
  ],
  nodeForm: {
    state: FormState.hidden,
    targetNode: 123,
    newName: ""
  }
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
        nodeForm: {
          state: FormState.hidden,
          targetNode: null,
          newName: ""
        },
        organization: [
          ...state.organization,
          {
            positionId: action.payload.positionId,
            supervisorPositionId: action.payload.supervisorId,
            employeeId: action.payload.positionId + 100,
            employeeName: state.nodeForm.newName
          }
        ]
      };
    case "DELETE_ALL_EMPLOYEES":
      return initialState;
    case "DELETE_EMPLOYEE":
      const newSup = state.organization.find(
        org => org.positionId === action.positionId
      )!.supervisorPositionId;
      return {
        ...state,
        selectedEmployee: newSup,
        organization: state.organization
          .filter(orgNode => orgNode.positionId !== action.positionId)
          .map(node => {
            if (+node.supervisorPositionId === action.positionId) {
              return {
                ...node,
                supervisorPositionId: newSup
              };
            }
            return node;
          })
      };
    case "START_ADD_NEW_EMPLOYEE":
      return {
        ...state,
        nodeForm: {
          ...state.nodeForm,
          state: FormState.addingTo,
          targetNode: action.supervisorNode
        }
      };
    case "UPDATE_NEW_NAME":
      return {
        ...state,
        nodeForm: {
          ...state.nodeForm,
          newName: action.newName
        }
      };
    case "DONE_EDITING_NODE":
      return {
        ...state,
        nodeForm: {
          state: FormState.hidden,
          targetNode: null,
          newName: ""
        }
      };
    default:
      return state;
  }
};

export default employeesReducer;
