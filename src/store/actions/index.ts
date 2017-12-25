// not using flux standard action! liberated.

export const selectEmployee = positionId => {
  return {
    type: "SELECT_EMPLOYEE",
    positionId
  };
};
