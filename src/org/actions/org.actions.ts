// not using flux standard action! liberated.

type selectOrgNodeAction = {
  type: "SELECT_ORG_NODE";
  positionId: number;
};

type addOrgNodeAction = {
  type: "ADD_ORG_NODE";
  payload: {
    positionId: number;
    supervisorId: number;
  };
};

type deleteAllOrgNodesAction = {
  type: "DELETE_ALL_ORG_NODES";
};

type deleteOrgNodeAction = {
  type: "DELETE_ORG_NODE";
  positionId: number;
};

type doneEditingOrgNode = {
  type: "DONE_EDITING_ORG_NODE";
};

// this just loads the form. should change
type startAddNewOrgNode = {
  type: "START_ADD_NEW_ORG_NODE";
  supervisorNode: number;
};

// we should centralize form stuff, because there will be a lot of inputs!
type updateNewEmployeeName = {
  type: "UPDATE_NEW_EMPLOYEE_NAME";
  newName: string;
};

export type orgNodeActions =
  | selectOrgNodeAction
  | addOrgNodeAction
  | deleteAllOrgNodesAction
  | deleteOrgNodeAction
  | startAddNewOrgNode
  | doneEditingOrgNode
  | updateNewEmployeeName;

export const selectOrgNode = (positionId: number): selectOrgNodeAction => {
  return {
    type: "SELECT_ORG_NODE",
    positionId
  };
};

export const addOrgNode = (
  positionId: number,
  supervisorId: number,
  employeeName: string
): addOrgNodeAction => {
  return {
    type: "ADD_ORG_NODE",
    payload: {
      positionId,
      supervisorId
    }
  };
};

export const deleteAllOrgNodes = (): deleteAllOrgNodesAction => {
  return {
    type: "DELETE_ALL_ORG_NODES"
  };
};

export const deleteEmployee = (positionId: number): deleteOrgNodeAction => {
  return {
    type: "DELETE_ORG_NODE",
    positionId
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

export const updateNewEmployeeName = (
  newName: string
): updateNewEmployeeName => {
  return {
    type: "UPDATE_NEW_EMPLOYEE_NAME",
    newName
  };
};
