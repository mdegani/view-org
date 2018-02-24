export enum FormInstance {
  NewNodeForm = "new-node-form",
  EditNodeForm = "edit-node-form"
}

type SaveFormValueString = {
  type: "SAVE_FORM_VALUE_STRING";
  payload: {
    form: FormInstance;
    field: string;
    value: string;
  };
};

type SaveFormValueNumber = {
  type: "SAVE_FORM_VALUE_NUMBER";
  payload: {
    form: FormInstance;
    field: string;
    value: number;
  };
};

type SaveFormValueBoolean = {
  type: "SAVE_FORM_VALUE_BOOLEAN";
  payload: {
    form: FormInstance;
    field: string;
    value: boolean;
  };
};

type ResetForms = {
  type: "RESET_FORMS";
};

type SetOpenNewOrgNodeForm = {
  type: "SET_OPEN_NEW_ORG_NODE_FORM";
  supervisorNode: number;
};

type DoneEditingOrgNode = {
  type: "SET_CLOSE_NEW_ORG_NODE_FORM";
};

export type orgNodeFormActions = SetOpenNewOrgNodeForm | DoneEditingOrgNode;

export type FormActions =
  | SaveFormValueString
  | SaveFormValueNumber
  | SaveFormValueBoolean
  | ResetForms;

export const setOpenNewOrgNodeForm = (
  supervisorNode: number,
  newName: string
): SetOpenNewOrgNodeForm => {
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
): SaveFormValueString => {
  return {
    type: "SAVE_FORM_VALUE_STRING",
    payload: {
      form,
      field,
      value
    }
  };
};

export const saveFormValueNumber = (
  form: FormInstance,
  field: string,
  value: number
): SaveFormValueNumber => {
  return {
    type: "SAVE_FORM_VALUE_NUMBER",
    payload: {
      form,
      field,
      value
    }
  };
};

export const saveFormValueBoolean = (
  form: FormInstance,
  field: string,
  value: boolean
): SaveFormValueBoolean => {
  return {
    type: "SAVE_FORM_VALUE_BOOLEAN",
    payload: {
      form,
      field,
      value
    }
  };
};

export const resetForms = (): ResetForms => {
  return {
    type: "RESET_FORMS"
  };
};
