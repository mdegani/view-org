export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  photoUrl: string;
  gender: string;
};

export type OrgNode = {
  positionId: number;
  supervisorPositionId: number;
  employee: Employee;
  positionName?: string;
  allSupervisors?: number[];
  orgSort?: string;
};

export type OrgSectionNode = {
  positionId: number;
  supervisorPositionId: number;
  employee: Employee;
  positionName?: string;
  allSupervisors?: number[];
  orgSort?: string;
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
  "firstName",
  "lastName",
  "gender",
  "picture"
}

export type AddNewOrgNodeFormState = {
  firstName: string;
  lastName: string;
  gender: string;
  picture: string;
};

export type FormState = {
  "new-node-form"?: AddNewOrgNodeFormState;
};

export type FormField = {
  [field: string]: string | number | boolean;
};

// TODO: consider moving stuff from test helpers here
