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
    employeeName: string;
  };
};

type deleteAllEmployeesAction = {
  type: "DELETE_ALL_EMPLOYEES";
};

type deleteEmployeeAction = {
  type: "DELETE_EMPLOYEE";
  positionId: number;
};

export type employeeActions =
  | selectEmployeeAction
  | addNewEmployeeAction
  | deleteAllEmployeesAction
  | deleteEmployeeAction;

export const selectEmployee = (positionId: number): selectEmployeeAction => {
  return {
    type: "SELECT_EMPLOYEE",
    positionId
  };
};

export const addNewEmployee = (
  positionId: number,
  supervisorId: number
): addNewEmployeeAction => {
  return {
    type: "ADD_EMPLOYEE",
    payload: {
      positionId,
      supervisorId,
      employeeName: prompt("Employee Name") || "default name" // what? you no like prompts?
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
