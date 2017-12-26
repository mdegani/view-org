// not using flux standard action! liberated.

export const selectEmployee = (positionId: number) => {
  return {
    type: "SELECT_EMPLOYEE",
    positionId
  };
};
