type SetOpenNewOrgNodeForm = {
  type: "SET_OPEN_NEW_ORG_NODE_FORM";
  supervisorNode: number;
};

type DoneEditingOrgNode = {
  type: "SET_CLOSE_NEW_ORG_NODE_FORM";
};

export type orgNodeFormActions = SetOpenNewOrgNodeForm | DoneEditingOrgNode;

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
