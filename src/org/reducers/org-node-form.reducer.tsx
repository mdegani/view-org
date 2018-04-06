import { OrgNodeFormState, FormStateEnum } from "../../org/types/org.types";
import { orgNodeFormActions } from "../actions/org-node-form.actions";

export const initialState: OrgNodeFormState = {
  state: FormStateEnum.hidden,
  targetNode: 123
};

export const orgNodeFormReducer = (
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
    case "SET_CLOSE_NEW_ORG_NODE_FORM":
      return {
        ...state,
        state: FormStateEnum.hidden,
        targetNode: null
      };
    default:
      return state;
  }
};

export default orgNodeFormReducer;
