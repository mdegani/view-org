export enum FormInstance {
  NewNodeForm = "new-node-form",
  EditNodeForm = "edit-node-form"
}

type saveFormValue<T> = {
  type: "SAVE_FORM_VALUE";
  payload: {
    form: FormInstance;
    field: string;
    value: T;
  };
};

type resetForms = {
  type: "RESET_FORMS";
};

type setOpenNewOrgNodeForm = {
  type: "SET_OPEN_NEW_ORG_NODE_FORM";
  supervisorNode: number;
};

type doneEditingOrgNode = {
  type: "SET_CLOSE_NEW_ORG_NODE_FORM";
};

export type orgNodeFormActions = setOpenNewOrgNodeForm | doneEditingOrgNode;

export type formActions =
  | saveFormValue<string>
  | saveFormValue<number>
  | resetForms;

export const setOpenNewOrgNodeForm = (
  supervisorNode: number,
  newName: string
): setOpenNewOrgNodeForm => {
  return {
    type: "SET_OPEN_NEW_ORG_NODE_FORM",
    supervisorNode
  };
};

export const setCloseNewOrgNodeForm = () => {
  return {
    type: "SET_CLOSE_NEW_ORG_NODE_FORM"
  };
};

export const saveFormValueString = (
  form: FormInstance,
  field: string,
  value: string
): saveFormValue<string> => {
  return {
    type: "SAVE_FORM_VALUE",
    payload: {
      form,
      field,
      value
    }
  };
};

export const resetForms = (): resetForms => {
  return {
    type: "RESET_FORMS"
  };
};
