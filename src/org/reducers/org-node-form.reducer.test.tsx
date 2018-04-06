import orgNodeFormReducer, { initialState } from "./org-node-form.reducer";
import { FormStateEnum } from "../types/org.types";

describe("orgNodeFormReducer", () => {
  it("should open a form that adds a new position to a target", () => {
    const actual = orgNodeFormReducer(initialState, {
      type: "SET_OPEN_NEW_ORG_NODE_FORM",
      supervisorNode: 99
    });

    const expected = {
      state: FormStateEnum.addingTo,
      targetNode: 99
    };

    expect(actual).toEqual(expected);
  });

  it("should close a form", () => {
    const actual = orgNodeFormReducer(initialState, {
      type: "SET_CLOSE_NEW_ORG_NODE_FORM"
    });

    const expected = {
      state: FormStateEnum.hidden,
      targetNode: null
    };

    expect(actual).toEqual(expected);
  });
});
