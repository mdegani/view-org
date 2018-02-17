import { OrganizationNode, OrganizationSectionNode } from "../types/org.types";

// Assumes the top position's supervisorId is 0
const TOP_POSITION_SUPERVISOR_PLACEHOLDER = 0;

export const getOrganizationNodeById = (
  organization: OrganizationNode[],
  nodeId: number
): OrganizationNode | undefined => {
  return organization.find(node => node.positionId === nodeId);
};

export const getDirectReportsOfOrgNode = (
  organization: OrganizationNode[],
  supervisorNodeId: number
): OrganizationNode[] => {
  return organization.filter(
    node => node.supervisorPositionId === supervisorNodeId
  );
};

export const getOrganizationLevelOne = (
  organization: OrganizationNode[]
): OrganizationSectionNode[] =>
  organization.map(node => {
    return {
      positionId: node.positionId,
      employeeId: node.employeeId,
      employeeName: node.employeeName,
      supervisorPositionId: node.supervisorPositionId,
      level: 1
    };
  });

// need better name for targetId
export const getNextSupervisorNode = (
  organization: OrganizationNode[],
  targetId: OrganizationNode
): OrganizationNode | undefined =>
  organization.find(node => {
    return node.positionId === targetId.supervisorPositionId;
  });

export const atTopOfOrg = (list: OrganizationNode[]) =>
  list[list.length - 1].supervisorPositionId ===
  TOP_POSITION_SUPERVISOR_PLACEHOLDER;

// targetId is not named correctly
export const assignLevel = (
  targetId: OrganizationNode,
  level: number
): OrganizationSectionNode => Object.assign({}, targetId, { level: level });

export const getAllSupervisorNodes = (
  organization: OrganizationNode[],
  // not named properly
  // gets a row for each supervisor relationship "target" has
  target: OrganizationNode,
  accumulator?: OrganizationSectionNode[] | undefined
): OrganizationSectionNode[] => {
  // first iteration:
  if (accumulator === undefined) {
    return getAllSupervisorNodes(organization, target, [
      assignLevel(target, 1)
    ]);
  }
  const _level = accumulator[accumulator.length - 1].level;

  // when we reach the top of org, return:
  if (atTopOfOrg(accumulator)) {
    return accumulator;
  }

  return getAllSupervisorNodes(organization, target, [
    ...accumulator,
    Object.assign(
      {} as OrganizationSectionNode,
      getNextSupervisorNode(organization, accumulator.find(
        x => x.level === _level
      ) as OrganizationNode),
      {
        positionId: target.positionId,
        employeeId: target.employeeId,
        employeeName: target.employeeName,
        level: _level + 1
      }
    )
  ]);
};

export const fullOrganizationList = (organization: OrganizationNode[]) =>
  organization.reduce((prev, curr, index, arr) => {
    return [...prev, ...getAllSupervisorNodes(arr, curr)];
  }, []);

export const getIterativeSupervisors = (
  organizationNode: OrganizationNode,
  organization: OrganizationNode[]
): OrganizationNode => {
  // first iteration
  if (!organizationNode.allSups) {
    organizationNode = Object.assign({}, organizationNode, {
      allSups: [organizationNode.supervisorPositionId]
    });
    getIterativeSupervisors(organizationNode, organization);
  }

  // need to assert this can't be undefined based on logic above
  const orgSupervisors = organizationNode.allSups as number[];
  const lastAllSup = orgSupervisors[orgSupervisors.length - 1];

  // if we've reached the top we're done
  // reverse the allSups array so supervisors appear
  // from highest to lower levels
  // attach a concatenated version of the array
  // for sorting
  if (lastAllSup === findOrganizationTopSupervisor(organization)) {
    const reversedAllSups = [
      ...orgSupervisors.reverse(),
      organizationNode.positionId
    ];
    // padding is probably the easiest solution
    const orgSort = reversedAllSups
      .map(supId => ("0000000000" + supId).slice(-10))
      .join("-");
    const nodeWithSupervisors: OrganizationNode = Object.assign(
      {},
      organizationNode,
      {
        orgSort,
        allSups: reversedAllSups
      }
    );
    return nodeWithSupervisors;
  }

  // get the next supervisor node
  return getIterativeSupervisors(
    Object.assign({}, organizationNode, {
      allSups: [
        // is that the correct assertion? assume array?
        ...(organizationNode.allSups as number[]),
        (getOrganizationNodeById(organization, lastAllSup) as OrganizationNode)
          .supervisorPositionId
      ]
    }),
    organization
  );
};

export const getOrganizationWithHorizontal = (
  organization: OrganizationNode[]
) => {
  return organization.map(orgItem => {
    return getIterativeSupervisors(orgItem, organization);
  });
};

export const getOrganizationBySupervisor = (
  organization: OrganizationNode[],
  positionId: number
) =>
  getOrganizationWithHorizontal(
    fullOrganizationList(organization)
      .filter(
        organizationNode => organizationNode.supervisorPositionId === positionId
      )
      .map(organizationNode => {
        return Object.assign(organizationNode, {
          orgSup: organizationNode.supervisorPositionId,
          supervisorPositionId: (organization.find(
            orgNode => orgNode.positionId === organizationNode.positionId
          ) as OrganizationNode).supervisorPositionId
        });
      })
  );

// find the top employee's supervisor
export const findOrganizationTopSupervisor = (
  organization: OrganizationNode[]
): number => {
  const allIds = organization.map(orgNode => {
    return orgNode.positionId;
  });

  return (organization.find(orgNode => {
    return !allIds.includes(orgNode.supervisorPositionId);
  }) as OrganizationNode).supervisorPositionId;
};
