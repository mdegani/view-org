import { FormInstance } from "../actions/org-node-form.actions";

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
};

export type CombinedState = {
  orgReducer: OrgState;
  orgNodeFormReducer: OrgNodeFormState;
  formReducer: FormState;
};

export type FormState = { [form in FormInstance]?: FormField };

export type FormField = {
  [field: string]: string | number | boolean;
};
