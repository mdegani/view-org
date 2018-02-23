import { FormState } from "../../org/types/org.types";
import { formActions } from "../actions/org-node-form.actions";

// pre-populate forms with values here
const initialState: FormState = {};

const formReducer = (
  state: FormState = initialState,
  action: formActions
): FormState => {
  switch (action.type) {
    case "SAVE_FORM_VALUE":
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.field]: action.payload.value
        }
      };
    case "RESET_FORMS":
      return initialState;
    default:
      return state;
  }
};

export default formReducer;
