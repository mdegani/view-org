import { OrgNodeFormState, FormStateEnum } from "../../org/types/org.types";
import { orgNodeFormActions } from "../actions/org-node-form.actions";

const initialState: OrgNodeFormState = {
  state: FormStateEnum.hidden,
  targetNode: 123,
  newName: ""
};

const orgReducer = (
  state: OrgNodeFormState = initialState,
  action: orgNodeFormActions
): OrgNodeFormState => {
  switch (action.type) {
    case "SET_OPEN_NEW_ORG_NODE_FORM":
      return {
        ...state,
        state: FormStateEnum.addingTo,
        targetNode: action.supervisorNode
      };
    case "UPDATE_NEW_EMPLOYEE_NAME":
      return {
        ...state,
        newName: action.newName
      };
    case "SET_CLOSE_NEW_ORG_NODE_FORM":
      return {
        ...state,
        state: FormStateEnum.hidden,
        targetNode: null,
        newName: ""
      };
    default:
      return state;
  }
};

export default orgReducer;
