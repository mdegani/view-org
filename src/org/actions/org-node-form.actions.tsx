type updateNewOrgNodeFormValues = {
  type: "UPDATE_NEW_ORG_NODE_FORM_VALUES";
  newName: string;
};

type setOpenNewOrgNodeForm = {
  type: "SET_OPEN_NEW_ORG_NODE_FORM";
  supervisorNode: number;
};

type doneEditingOrgNode = {
  type: "SET_CLOSE_NEW_ORG_NODE_FORM";
};

export type orgNodeFormActions =
  | updateNewOrgNodeFormValues
  | setOpenNewOrgNodeForm
  | doneEditingOrgNode;

export const updateNewOrgNodeFormValues = (
  newName: string
): updateNewOrgNodeFormValues => {
  return {
    type: "UPDATE_NEW_ORG_NODE_FORM_VALUES",
    newName
  };
};

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
