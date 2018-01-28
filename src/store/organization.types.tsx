export type OrganizationNode = {
  positionId: number;
  supervisorPositionId: number;
  employeeId: number;
  employeeName: string;
  allSups?: number[];
  orgSort?: string;
};

export type OrganizationSectionNode = {
  positionId: number; // refactor to use organizationNode (or position)
  supervisorPositionId: number;
  employeeId: number;
  employeeName: string;
  level: number;
};

// for redecuers/employees
// TODO: refactor so we're consistent with "organization" vs "employee" names

export type EmployeesState = {
  selectedEmployee: number;
  organization: OrganizationNode[];
  showModal: boolean;
};

export type CombinedState = {
  employeesReducer: EmployeesState;
};
