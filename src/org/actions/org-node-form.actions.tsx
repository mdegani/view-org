type updateNewEmployeeName = {
  type: "UPDATE_NEW_EMPLOYEE_NAME";
  newName: string;
};

// this just loads the form. should change
type startAddNewOrgNode = {
  type: "START_ADD_NEW_ORG_NODE";
  supervisorNode: number;
};

type doneEditingOrgNode = {
  type: "DONE_EDITING_ORG_NODE";
};

export type orgNodeFormActions =
  | updateNewEmployeeName
  | startAddNewOrgNode
  | doneEditingOrgNode;

export const updateNewEmployeeName = (
  newName: string
): updateNewEmployeeName => {
  return {
    type: "UPDATE_NEW_EMPLOYEE_NAME",
    newName
  };
};

export const startAddNewOrgNode = (
  supervisorNode: number,
  newName: string
): startAddNewOrgNode => {
  return {
    type: "START_ADD_NEW_ORG_NODE",
    supervisorNode
  };
};

export const doneEditingNode = () => {
  return {
    type: "DONE_EDITING_ORG_NODE"
  };
};
