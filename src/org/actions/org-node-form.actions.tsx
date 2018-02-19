type updateNewEmployeeName = {
  type: "UPDATE_NEW_EMPLOYEE_NAME";
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
  | updateNewEmployeeName
  | setOpenNewOrgNodeForm
  | doneEditingOrgNode;

export const updateNewEmployeeName = (
  newName: string
): updateNewEmployeeName => {
  return {
    type: "UPDATE_NEW_EMPLOYEE_NAME",
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
