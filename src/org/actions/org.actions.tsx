type selectOrgNodeAction = {
  type: "SELECT_ORG_NODE";
  positionId: number;
};

// payload to have all employee information
type addOrgNodeAction = {
  type: "ADD_ORG_NODE";
  payload: {
    positionId: number;
    supervisorId: number;
    employeeName: string;
  };
};

type deleteAllOrgNodesAction = {
  type: "DELETE_ALL_ORG_NODES";
};

type deleteOrgNodeAction = {
  type: "DELETE_ORG_NODE";
  positionId: number;
};

export type orgNodeActions =
  | selectOrgNodeAction
  | addOrgNodeAction
  | deleteAllOrgNodesAction
  | deleteOrgNodeAction;

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
      supervisorId,
      employeeName
    }
  };
};

export const deleteAllOrgNodes = (): deleteAllOrgNodesAction => {
  return {
    type: "DELETE_ALL_ORG_NODES"
  };
};

export const deleteOrgNode = (positionId: number): deleteOrgNodeAction => {
  return {
    type: "DELETE_ORG_NODE",
    positionId
  };
};
