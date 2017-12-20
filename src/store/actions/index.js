// not using flux standard action! liberated.

export const selectEmployee = eeId => {
  return {
    type: 'SELECT_EMPLOYEE',
    eeId,
  };
};
