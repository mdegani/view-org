import { OrgNode, OrgSectionNode } from "../types/org.types";

// Assumes the top position's supervisorId is 0
const TOP_POSITION_SUPERVISOR_PLACEHOLDER = 0;

export const getOrgNodeById = (
  org: OrgNode[],
  orgNodeId: number
): OrgNode | undefined => {
  return org.find(node => node.positionId === orgNodeId);
};

export const getDirectReportsOfOrgNode = (
  organization: OrgNode[],
  supervisorNodeId: number
): OrgNode[] => {
  return organization.filter(
    node => node.supervisorPositionId === supervisorNodeId
  );
};

export const getOrgLevelOne = (org: OrgNode[]): OrgSectionNode[] =>
  org.map(node => {
    return {
      positionId: node.positionId,
      employeeId: node.employeeId,
      employeeName: node.employeeName,
      supervisorPositionId: node.supervisorPositionId,
      orgLevel: 1
    };
  });

// need better name for targetId
export const getNextSupervisorNode = (
  organization: OrgNode[],
  targetId: OrgNode
): OrgNode | undefined =>
  organization.find(node => {
    return node.positionId === targetId.supervisorPositionId;
  });

export const atTopOfOrg = (list: OrgNode[]) =>
  list[list.length - 1].supervisorPositionId ===
  TOP_POSITION_SUPERVISOR_PLACEHOLDER;

// targetId is not named correctly
export const assignLevel = (
  targetId: OrgNode,
  orgLevel: number
): OrgSectionNode => Object.assign({}, targetId, { orgLevel: orgLevel });

export const getAllSupervisorNodes = (
  organization: OrgNode[],
  // not named properly
  // gets a row for each supervisor relationship "target" has
  target: OrgNode,
  accumulator?: OrgSectionNode[] | undefined
): OrgSectionNode[] => {
  // first iteration:
  if (accumulator === undefined) {
    return getAllSupervisorNodes(organization, target, [
      assignLevel(target, 1)
    ]);
  }
  const _level = accumulator[accumulator.length - 1].orgLevel;

  // when we reach the top of org, return:
  if (atTopOfOrg(accumulator)) {
    return accumulator;
  }

  return getAllSupervisorNodes(organization, target, [
    ...accumulator,
    Object.assign(
      {} as OrgSectionNode,
      getNextSupervisorNode(organization, accumulator.find(
        x => x.orgLevel === _level
      ) as OrgNode),
      {
        positionId: target.positionId,
        employeeId: target.employeeId,
        employeeName: target.employeeName,
        orgLevel: _level + 1
      }
    )
  ]);
};

export const fullOrgNodeList = (organization: OrgNode[]) =>
  organization.reduce((prev, curr, index, arr) => {
    return [...prev, ...getAllSupervisorNodes(arr, curr)];
  }, []);

export const getIterativeSupervisors = (
  organizationNode: OrgNode,
  organization: OrgNode[]
): OrgNode => {
  // first iteration
  if (!organizationNode.allSupervisors) {
    organizationNode = Object.assign({}, organizationNode, {
      allSupervisors: [organizationNode.supervisorPositionId]
    });
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
    const orgNodeWithSupervisors: OrgNode = Object.assign(
      {},
      organizationNode,
      {
        orgSort,
        allSupervisors: reversedAllSups
      }
    );
    return orgNodeWithSupervisors;
  }

  // get the next supervisor node
  return getIterativeSupervisors(
    Object.assign({}, organizationNode, {
      allSupervisors: [
        // is that the correct assertion? assume array?
        ...(organizationNode.allSupervisors as number[]),
        (getOrgNodeById(organization, lastAllSup) as OrgNode)
          .supervisorPositionId
      ]
    }),
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
        return Object.assign(organizationNode, {
          orgSup: organizationNode.supervisorPositionId,
          supervisorPositionId: (organization.find(
            orgNode => orgNode.positionId === organizationNode.positionId
          ) as OrgNode).supervisorPositionId
        });
      })
  );

// find the top employee's supervisor
export const findOrgTopSupervisor = (organization: OrgNode[]): number => {
  const allIds = organization.map(orgNode => {
    return orgNode.positionId;
  });

  return (organization.find(orgNode => {
    return !allIds.includes(orgNode.supervisorPositionId);
  }) as OrgNode).supervisorPositionId;
};
