export type OrgNode = {
  positionId: number;
  supervisorPositionId: number;
  employeeId: number;
  employeeName: string;
  allSups?: number[];
  orgSort?: string;
};

export type OrgSectionNode = {
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
  organization: OrgNode[];
  nodeForm: {
    state: FormState;
    targetNode: number | null;
    newName: string;
  };
};

export type CombinedState = {
  employeesReducer: EmployeesState;
};
