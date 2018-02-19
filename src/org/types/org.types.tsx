export type OrgNode = {
  positionId: number;
  supervisorPositionId: number;
  employeeId: number;
  employeeName: string;
  allSupervisors?: number[];
  orgSort?: string;
};

export type OrgSectionNode = {
  positionId: number; // refactor to use organizationNode (or position)
  supervisorPositionId: number;
  employeeId: number;
  employeeName: string;
  orgLevel: number;
};

export enum FormState {
  "hidden",
  "addingTo",
  "editing"
}

export type OrgState = {
  selectedOrgNode: number;
  organization: OrgNode[];
  nodeForm: {
    state: FormState;
    targetNode: number | null;
    newName: string;
  };
};

export type CombinedState = {
  orgReducer: OrgState;
};
