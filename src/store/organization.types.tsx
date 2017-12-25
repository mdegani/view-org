// position
// add emploteeId to this
export type OrganizationNode = {
  positionId: number;
  supervisorPositionId: number;
  allSups?: number[];
  orgSort?: string;
  name?: string; // this needs to go
};

export type OrganizationSectionNode = {
  positionId: number; // refactor to use organizationNode (or position)
  supervisorPositionId: number;
  level: number;
};

// add a bunch of other optional properties?
export type Employee = {
  employeeId: number;
  employeeName: string;
};
