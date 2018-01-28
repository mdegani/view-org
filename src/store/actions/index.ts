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

type showModalAction = {
  type: "SHOW_MODAL";
  payload: boolean;
};

export type employeeActions =
  | selectEmployeeAction
  | addNewEmployeeAction
  | showModalAction;

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

export const setShowModal = (showModal: boolean): showModalAction => {
  return {
    type: "SHOW_MODAL",
    payload: showModal
  };
};
