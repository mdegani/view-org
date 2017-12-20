export const getOrganizationNodeById = (organization, targetId) =>
  organization.find(node => node.id === targetId);

export const getOrganizationNodeByDirectSupervisor = (
  organization,
  targetSupId
) => organization.filter(node => node.sup === targetSupId);

export const getOrganizationLevelOne = organization =>
  organization.map(node => {
    return { id: node.id, sup: node.sup, level: 1 };
  });

export const getNextSupervisorNode = (organization, targetId) =>
  organization.find(node => {
    return node.id === targetId.sup;
  });

// TODO this will need to change to not be locked to 0
export const atTopOfOrg = list => list[list.length - 1].sup === 0;

export const assignLevel = (targetId, level) =>
  Object.assign({}, targetId, { level: level });

export const getAllSupervisorNodes = (organization, targetId, accumulator) => {
  // first iteration:
  if (accumulator === undefined) {
    return getAllSupervisorNodes(organization, targetId, [
      assignLevel(targetId, 1)
    ]);
  }
  const _level = accumulator[accumulator.length - 1].level;

  // when we reach the top of org, return:
  if (atTopOfOrg(accumulator)) {
    return accumulator;
  }

  return getAllSupervisorNodes(organization, targetId, [
    ...accumulator,
    Object.assign(
      {},
      getNextSupervisorNode(
        organization,
        accumulator.find(x => x.level === _level)
      ),
      { id: targetId.id, level: _level + 1 }
    )
  ]);
};

export const fullOrganizationList = organization =>
  organization.reduce((prev, curr, index, arr) => {
    return [...prev, ...getAllSupervisorNodes(arr, curr)];
  }, []);

export const getFullOrganizationListWithEmployeeNames = (
  organization,
  employees
) =>
  fullOrganizationList(organization).map(fullTgtItem =>
    Object.assign({}, fullTgtItem, {
      name: employees.find(ee => ee.id === fullTgtItem.id).name
    })
  );

export const fullSingle = (organization, eeId) =>
  fullOrganizationList(organization).filter(ee => ee.id === eeId);

export const getOrganizationBySupervisor = (organization, employees, eeId) =>
  getOrganizationWithHorizontal(
    getFullOrganizationListWithEmployeeNames(organization, employees)
      .filter(ee => ee.sup === eeId)
      .map(ee => {
        return Object.assign(ee, {
          orgSup: ee.sup,
          sup: organization.find(orgNode => orgNode.id === ee.id).sup
        });
      })
  );

export const organizationWithName = (organization, employees) =>
  organization.map(orgItem =>
    // todo, object spread instead object.assign, it's nicer
    Object.assign({}, orgItem, {
      name: employees.find(employee => employee.id === orgItem.id).name,
      orgSup: orgItem.sup
    })
  );

export const getOrganizationWithHorizontal = organization => {
  return organization.map(org_item => {
    return getIterativeSupervisors(org_item, organization);
  });
};

export const getIterativeSupervisors = (organization_node, organization) => {
  // first iteration
  if (!organization_node.allSups) {
    organization_node = Object.assign({}, organization_node, {
      allSups: [organization_node.sup]
    });
    getIterativeSupervisors(organization_node, organization);
  }

  const lastAllSup =
    organization_node.allSups[organization_node.allSups.length - 1];

  // if we've reached the top we're done
  // reverse the allSups array so supervisors appear
  // from highest to lower levels
  // attach a concatenated version of the array
  // for sorting
  if (lastAllSup === findOrganizationTopSupervisor(organization)) {
    const reversedAllSups = organization_node.allSups.reverse();
    // TODO this will probably not sort well once we have id's
    // with more than 2 digits
    // padding is probably the easiest solution
    const orgSort = reversedAllSups.join("-");
    return Object.assign({}, organization_node, {
      orgSort,
      allSups: reversedAllSups
    });
  }

  // get the next supervisor node
  return getIterativeSupervisors(
    Object.assign({}, organization_node, {
      allSups: [
        ...organization_node.allSups,
        getOrganizationNodeById(organization, lastAllSup).sup
      ]
    }),
    organization
  );
};

// find the top employee's supervisor
export const findOrganizationTopSupervisor = organization => {
  const allIds = organization.map(orgNode => {
    return orgNode.id;
  });

  return organization.find(orgNode => {
    return !allIds.includes(orgNode.sup);
  }).sup;
};
