import { OrgNode, OrgSectionNode } from "../types/org.types";

// Assumes the top position's supervisorId is 0
const TOP_POSITION_SUPERVISOR_PLACEHOLDER = 0;

export const getOrgNodeById = (
  org: OrgNode[],
  positionId: number
): OrgNode | undefined => {
  return org.find(orgNode => orgNode.positionId === positionId);
};

export const getDirectReportsOfOrgNode = (
  organization: OrgNode[],
  supervisorNodeId: number
): OrgNode[] => {
  return organization.filter(
    node => node.supervisorPositionId === supervisorNodeId
  );
};

export const getOrgLevelOne = (orgNode: OrgNode[]): OrgSectionNode[] =>
  orgNode.map(node => {
    return {
      positionId: node.positionId,
      supervisorPositionId: node.supervisorPositionId,
      orgLevel: 1,
      employee: {
        id: node.employee.id,
        firstName: node.employee.firstName,
        lastName: node.employee.lastName,
        gender: node.employee.gender,
        photoUrl: node.employee.photoUrl
      },
      // TODO, in all cases where we have this optional orgSort, we should be using
      // object spread to entirely omit the property when it's absent, rather than assign empty string
      orgSort: node.orgSort || ""
    };
  });

// need better name for targetId
export const getNextSupervisorNode = (
  organization: OrgNode[],
  orgNode: OrgNode
): OrgNode | undefined =>
  organization.find(node => {
    return node.positionId === orgNode.supervisorPositionId;
  });

// TODO: this function has no test and looks crappy
export const atTopOfOrg = (list: OrgNode[]) =>
  list[list.length - 1].supervisorPositionId ===
  TOP_POSITION_SUPERVISOR_PLACEHOLDER;

export const assignLevel = (
  orgNode: OrgNode,
  orgLevel: number
): OrgSectionNode => ({ ...orgNode, ...{ orgLevel: orgLevel } });

export const getAllSupervisorNodes = (
  orgNode: OrgNode,
  organization: OrgNode[],
  accumulator?: OrgSectionNode[] | undefined
): OrgSectionNode[] => {
  // first iteration:
  if (accumulator === undefined) {
    return getAllSupervisorNodes(orgNode, organization, [
      assignLevel(orgNode, 1)
    ]);
  }
  const _level = accumulator[accumulator.length - 1].orgLevel;

  // when we reach the top of org, return:
  if (atTopOfOrg(accumulator)) {
    return accumulator;
  }

  return getAllSupervisorNodes(orgNode, organization, [
    ...accumulator,
    {
      ...getNextSupervisorNode(organization, accumulator.find(
        // TODO: create a generic node finding function
        x => x.orgLevel === _level
      ) as OrgNode)!,
      ...{
        positionId: orgNode.positionId,
        employee: orgNode.employee,
        orgLevel: _level + 1
      }
    }
  ]);
};

export const fullOrgNodeList = (organization: OrgNode[]): OrgSectionNode[] =>
  organization.reduce((prev, curr, index, arr) => {
    return [...prev, ...getAllSupervisorNodes(curr, arr)];
  }, []);

export const getIterativeSupervisors = (
  organizationNode: OrgNode,
  organization: OrgNode[]
): OrgNode => {
  // first iteration
  if (!organizationNode.allSupervisors) {
    organizationNode = {
      ...organizationNode,
      ...{
        allSupervisors: [organizationNode.supervisorPositionId]
      }
    };
    getIterativeSupervisors(organizationNode, organization);
  }

  // need to assert this can't be undefined based on logic above
  const orgSupervisors = organizationNode.allSupervisors as number[];
  const lastAllSup = orgSupervisors[orgSupervisors.length - 1];

  // if we've reached the top we're done
  // reverse the allSupervisors array so supervisors appear
  // from highest to lower levels
  // attach a concatenated version of the array
  // for sorting
  if (lastAllSup === findOrgTopSupervisor(organization)) {
    const reversedAllSups = [
      ...orgSupervisors.reverse(),
      organizationNode.positionId
    ];
    // padding is probably the easiest solution
    const orgSort = reversedAllSups
      .map(supId => ("0000000000" + supId).slice(-10))
      .join("-");
    const orgNodeWithSupervisors: OrgNode = {
      ...organizationNode,
      ...{
        orgSort,
        allSupervisors: reversedAllSups
      }
    };
    return orgNodeWithSupervisors;
  }

  // get the next supervisor node
  return getIterativeSupervisors(
    {
      ...organizationNode,
      ...{
        allSupervisors: [
          // is that the correct assertion? assume array?
          ...(organizationNode.allSupervisors as number[]),
          (getOrgNodeById(organization, lastAllSup) as OrgNode)
            .supervisorPositionId
        ]
      }
    },
    organization
  );
};

export const getOrgWithHorizontal = (organization: OrgNode[]) => {
  return organization.map(orgItem => {
    return getIterativeSupervisors(orgItem, organization);
  });
};

export const getOrgBySupervisor = (
  organization: OrgNode[],
  positionId: number
) =>
  getOrgWithHorizontal(
    fullOrgNodeList(organization)
      .filter(
        organizationNode => organizationNode.supervisorPositionId === positionId
      )
      .map(organizationNode => {
        return {
          positionId: organizationNode.positionId,
          employee: organizationNode.employee,
          supervisorPositionId: (organization.find(
            orgNode => orgNode.positionId === organizationNode.positionId
          ) as OrgNode).supervisorPositionId
        };
      })
  );

// find the top org node's supervisor
export const findOrgTopSupervisor = (organization: OrgNode[]): number => {
  const allIds = organization.map(orgNode => {
    return orgNode.positionId;
  });

  return (organization.find(orgNode => {
    return !allIds.includes(orgNode.supervisorPositionId);
  }) as OrgNode).supervisorPositionId;
};
