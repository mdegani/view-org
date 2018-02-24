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

export type FormActions =
  | SaveFormValueString
  | SaveFormValueNumber
  | SaveFormValueBoolean
  | ResetForms;

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
