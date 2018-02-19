export type OrgNode = {
  positionId: number;
  supervisorPositionId: number;
  employeeId: number;
  employeeName: string;
  allSupervisors?: number[];
  orgSort?: string;
};

export type OrgSectionNode = {
  positionId: number;
  supervisorPositionId: number;
  employeeId: number;
  employeeName: string;
  orgLevel: number;
};

export enum FormStateEnum {
  "hidden",
  "addingTo",
  "editing"
}

export type OrgState = {
  selectedOrgNode: number;
  organization: OrgNode[];
};

export type OrgNodeFormState = {
  state: FormStateEnum;
  targetNode: number | null;
  newName: string;
};

export type CombinedState = {
  orgReducer: OrgState;
  orgNodeFormReducer: OrgNodeFormState;
};
