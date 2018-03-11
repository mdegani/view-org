import { OrgState } from "../../org/types/org.types";
import { orgNodeActions } from "../actions/org.actions";

const initialState: OrgState = {
  selectedOrgNode: 1,
  organization: []
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
            employee: {
              id: action.payload.positionId + 100,
              firstName: action.payload.employeeFirstName,
              lastName: action.payload.employeeLastName,
              gender: action.payload.employeeGender,
              photoUrl: action.payload.photoUrl
            }
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
