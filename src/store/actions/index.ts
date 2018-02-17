// not using flux standard action! liberated.

type selectEmployeeAction = {
  type: "SELECT_EMPLOYEE";
  positionId: number;
};

type addNewEmployeeAction = {
  type: "ADD_EMPLOYEE";
  payload: {
    positionId: number;
    supervisorId: number;
  };
};

type deleteAllEmployeesAction = {
  type: "DELETE_ALL_EMPLOYEES";
};

type deleteEmployeeAction = {
  type: "DELETE_EMPLOYEE";
  positionId: number;
};

type doneEditingNode = {
  type: "DONE_EDITING_NODE";
};

type startAddNewEmployee = {
  type: "START_ADD_NEW_EMPLOYEE";
  supervisorNode: number;
};

// we should centralize form stuff, because there will be a lot of inputs!
type updateNewName = {
  type: "UPDATE_NEW_NAME";
  newName: string;
};

export type employeeActions =
  | selectEmployeeAction
  | addNewEmployeeAction
  | deleteAllEmployeesAction
  | deleteEmployeeAction
  | startAddNewEmployee
  | doneEditingNode
  | updateNewName;

export const selectEmployee = (positionId: number): selectEmployeeAction => {
  return {
    type: "SELECT_EMPLOYEE",
    positionId
  };
};

export const addNewEmployee = (
  positionId: number,
  supervisorId: number,
  employeeName: string
): addNewEmployeeAction => {
  return {
    type: "ADD_EMPLOYEE",
    payload: {
      positionId,
      supervisorId
    }
  };
};

export const deleteAllEmployees = (): deleteAllEmployeesAction => {
  return {
    type: "DELETE_ALL_EMPLOYEES"
  };
};

export const deleteEmployee = (positionId: number): deleteEmployeeAction => {
  return {
    type: "DELETE_EMPLOYEE",
    positionId
  };
};

export const startAddNewEmployee = (
  supervisorNode: number,
  newName: string
): startAddNewEmployee => {
  return {
    type: "START_ADD_NEW_EMPLOYEE",
    supervisorNode
  };
};

export const doneEditingNode = () => {
  return {
    type: "DONE_EDITING_NODE"
  };
};

export const updateNewName = (newName: string): updateNewName => {
  return {
    type: "UPDATE_NEW_NAME",
    newName
  };
};
