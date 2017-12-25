import {
  OrganizationNode,
  OrganizationSectionNode,
  Employee,
} from './organization.types';

// TODO this will need to change to not be locked to 0
const TOP_POSITION_SUPERVISOR_PLACEHOLDER = 0;

export const getOrganizationNodeById = (
  organization: OrganizationNode[],
  nodeId: number,
): OrganizationNode | undefined => {
  return organization.find(node => node.positionId === nodeId);
};

export const getDirectReportsOfOrgNode = (
  organization: OrganizationNode[],
  supervisorNodeId: number,
): OrganizationNode[] => {
  return organization.filter(
    node => node.supervisorPositionId === supervisorNodeId,
  );
};

export const getOrganizationLevelOne = (
  organization: OrganizationNode[],
): OrganizationSectionNode[] =>
  organization.map(node => {
    return {
      positionId: node.positionId,
      supervisorPositionId: node.supervisorPositionId,
      level: 1,
    };
  });

// need better name for targetId
export const getNextSupervisorNode = (
  organization: OrganizationNode[],
  targetId: OrganizationNode,
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
  level: number,
): OrganizationSectionNode => Object.assign({}, targetId, { level: level });

export const getAllSupervisorNodes = (
  organization: OrganizationNode[],
  // not named properly
  target: OrganizationNode,
  accumulator?: OrganizationSectionNode[] | undefined,
): OrganizationSectionNode[] => {
  // first iteration:
  if (accumulator === undefined) {
    return getAllSupervisorNodes(organization, target, [
      assignLevel(target, 1),
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
        x => x.level === _level,
      ) as OrganizationNode),
      { positionId: target.positionId, level: _level + 1 },
    ),
  ]);
};

// prev type? never[]?
export const fullOrganizationList = (organization: OrganizationNode[]) =>
  organization.reduce((prev, curr, index, arr) => {
    return [...prev, ...getAllSupervisorNodes(arr, curr)];
  }, []);

export const getFullOrganizationListWithEmployeeNames = (
  organization,
  employees,
) =>
  fullOrganizationList(organization).map(fullTgtItem =>
    Object.assign({}, fullTgtItem, {
      employeeName: employees.find(
        ee => ee.employeeId === fullTgtItem.positionId,
      ).employeeName,
    }),
  );

// export const fullSingle = (organization, eeId) =>
//   fullOrganizationList(organization).filter(ee => ee.id === eeId);

export const getOrganizationBySupervisor = (organization, employees, eeId) =>
  getOrganizationWithHorizontal(
    getFullOrganizationListWithEmployeeNames(organization, employees)
      .filter(ee => ee.supervisorPositionId === eeId)
      .map(ee => {
        return Object.assign(ee, {
          orgSup: ee.supervisorPositionId,
          supervisorPositionId: organization.find(
            orgNode => orgNode.positionId === ee.positionId,
          ).supervisorPositionId,
        });
      }),
  );

// TODO: remove this, because names will come from employee object in selector
export const organizationWithName = (
  organization: OrganizationNode[],
  employees: Employee[],
) =>
  organization.map(orgItem =>
    // todo, object spread instead object.assign, it's nicer
    Object.assign({}, orgItem, {
      // assert that employee will exist, this is probably not right
      name: (employees.find(
        employee => employee.employeeId === orgItem.positionId,
      ) as Employee).employeeName,
      orgSup: orgItem.supervisorPositionId,
    }),
  );

export const getOrganizationWithHorizontal = (
  organization: OrganizationNode[],
) => {
  return organization.map(orgItem => {
    return getIterativeSupervisors(orgItem, organization);
  });
};

export const getIterativeSupervisors = (
  organizationNode: OrganizationNode,
  organization: OrganizationNode[],
): OrganizationNode => {
  // first iteration
  if (!organizationNode.allSups) {
    organizationNode = Object.assign({}, organizationNode, {
      allSups: [organizationNode.supervisorPositionId],
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
    const reversedAllSups = orgSupervisors.reverse();
    // TODO this will probably not sort well once we have id's
    // with more than 2 digits
    // padding is probably the easiest solution
    const orgSort = reversedAllSups.join('-');
    const nodeWithSupervisors: OrganizationNode = Object.assign(
      {},
      organizationNode,
      {
        orgSort,
        allSups: reversedAllSups,
      },
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
          .supervisorPositionId,
      ],
    }),
    organization,
  );
};

// find the top employee's supervisor
export const findOrganizationTopSupervisor = (
  organization: OrganizationNode[],
): number => {
  const allIds = organization.map(orgNode => {
    return orgNode.positionId;
  });

  return (organization.find(orgNode => {
    return !allIds.includes(orgNode.supervisorPositionId);
  }) as OrganizationNode).supervisorPositionId;
};
