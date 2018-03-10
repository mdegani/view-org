import { FormState } from "../../org/types/org.types";
import { FormActions } from "../actions/from.actions";

// pre-populate forms with values here
const initialState: FormState = {
  "new-node-form": {
    firstName: "",
    lastName: "",
    gender: "",
    picture: ""
  }
};

const formReducer = (
  state: FormState = initialState,
  action: FormActions
): FormState => {
  switch (action.type) {
    case "SAVE_FORM_VALUE_STRING":
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.field]: action.payload.value
        }
      };
    case "SAVE_FORM_VALUE_NUMBER":
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.field]: action.payload.value
        }
      };
    case "SAVE_FORM_VALUE_BOOLEAN":
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.field]: action.payload.value
        }
      };
    case "RESET_FORMS":
      return { ...initialState };
    default:
      return state;
  }
};

export default formReducer;
