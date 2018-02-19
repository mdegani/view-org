import { OrgState } from "../../org/types/org.types";
import { orgNodeActions } from "../actions/org.actions";

const initialState: OrgState = {
  selectedOrgNode: 1,
  organization: [
    {
      positionId: 1,
      supervisorPositionId: 0,
      employeeId: 101,
      employeeName: "Mr. Big, CEO"
    }
  ]
};

const orgReducer = (
  state: OrgState = initialState,
  action: orgNodeActions
): OrgState => {
  switch (action.type) {
    case "SELECT_ORG_NODE":
      return Object.assign({}, state, { selectedOrgNode: +action.positionId });
    case "ADD_ORG_NODE":
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
    case "DELETE_ALL_ORG_NODES":
      return initialState;
    case "DELETE_ORG_NODE":
      const newSup = state.organization.find(
        org => org.positionId === action.positionId
      )!.supervisorPositionId;
      return {
        ...state,
        selectedOrgNode: newSup,
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
    default:
      return state;
  }
};

export default orgReducer;
