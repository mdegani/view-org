export type OrgNode = {
  positionId: number;
  supervisorPositionId: number;
  employeeId: number;
  employeeName: string;
  positionName?: string;
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
};

export type CombinedState = {
  orgReducer: OrgState;
  orgNodeFormReducer: OrgNodeFormState;
  formReducer: FormState;
};

export enum Fields {
  "name",
  "lastName"
}

export type AddNewOrgNodeFormState = {
  name: string;
  lastName: string;
};

export type FormState = {
  "new-node-form"?: AddNewOrgNodeFormState;
};

export type FormField = {
  [field: string]: string | number | boolean;
};
