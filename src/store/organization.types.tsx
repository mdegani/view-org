// position
// add emploteeId to this
export type OrganizationNode = {
  positionId: number;
  supervisorPositionId: number;
  employeeId: number;
  allSups?: number[];
  orgSort?: string;
};

export type OrganizationSectionNode = {
  positionId: number; // refactor to use organizationNode (or position)
  supervisorPositionId: number;
  employeeId: number;
  level: number;
};

// add a bunch of other optional properties?
export type Employee = {
  employeeId: number;
  employeeName: string;
};

export type OrganizationNodeWithEmployeeInfo = {
  positionId: number;
  supervisorPositionId: number;
  allSups?: number[];
  orgSort?: string;
  employeeId: number;
  employeeName: string;
};
