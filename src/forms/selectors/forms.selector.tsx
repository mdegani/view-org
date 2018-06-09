import { CombinedState } from "../../org/types/org.types";

export const isNameValid = (state: CombinedState) => {
  return state.formReducer["new-node-form"]!.firstName !== "";
};
