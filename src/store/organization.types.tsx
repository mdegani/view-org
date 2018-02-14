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

// for reducers/employees
// TODO: refactor so we're consistent with "organization" vs "employee" names

export enum FormState {
  "hidden",
  "addingTo",
  "editing"
}

export type EmployeesState = {
  selectedEmployee: number;
  organization: OrganizationNode[];
  nodeForm: {
    state: FormState;
    targetNode: number | null;
  };
};

export type CombinedState = {
  employeesReducer: EmployeesState;
};
