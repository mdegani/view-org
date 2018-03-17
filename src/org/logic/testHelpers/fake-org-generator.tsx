import { OrgNode, OrgSectionNode } from "../../types/org.types";

export type OrgNodeKeys = {
  positionId: number;
  supervisorPositionId: number;
  allSupervisors?: number[];
};

export type OrgSectionNodeKeys = {
  positionId: number;
  supervisorPositionId: number;
  orgLevel: number;
};

export const createOrgNode = (posSuper: OrgNodeKeys): OrgNode => ({
  positionId: posSuper.positionId,
  supervisorPositionId: posSuper.supervisorPositionId,
  employee: {
    id: 100 + posSuper.positionId,
    firstName: "first name " + posSuper.positionId,
    lastName: "last name " + posSuper.positionId,
    gender: "gender " + posSuper.positionId,
    photoUrl: ""
  }
});

export const createOrg = (orgNodeKeysList: OrgNodeKeys[]) =>
  orgNodeKeysList.map((posSuper: OrgNodeKeys): OrgNode => {
    return createOrgNode(posSuper);
  });

export const createOrgSection = (
  orgSectionNodeKeysList: OrgSectionNodeKeys[]
) =>
  orgSectionNodeKeysList.map(
    (orgSectionNodeKeys: OrgSectionNodeKeys): OrgSectionNode => {
      return {
        positionId: orgSectionNodeKeys.positionId,
        supervisorPositionId: orgSectionNodeKeys.supervisorPositionId,
        employee: {
          id: 100 + orgSectionNodeKeys.positionId,
          firstName: "first name " + orgSectionNodeKeys.positionId,
          lastName: "last name " + orgSectionNodeKeys.positionId,
          gender: "gender " + orgSectionNodeKeys.positionId,
          photoUrl: ""
        },
        orgLevel: orgSectionNodeKeys.orgLevel
      };
    }
  );

const fakeOrgRelationships: OrgNodeKeys[] = [
  { positionId: 1, supervisorPositionId: 0 },
  { positionId: 2, supervisorPositionId: 1 },
  { positionId: 3, supervisorPositionId: 1 },
  { positionId: 4, supervisorPositionId: 3 },
  { positionId: 5, supervisorPositionId: 3 },
  { positionId: 6, supervisorPositionId: 4 },
  { positionId: 7, supervisorPositionId: 2 }
];

export const fakeOrg: OrgNode[] = createOrg(fakeOrgRelationships);

const fakeOrgFullTargetRelationships: OrgSectionNodeKeys[] = [
  { positionId: 1, supervisorPositionId: 0, orgLevel: 1 },
  { positionId: 2, supervisorPositionId: 1, orgLevel: 1 },
  { positionId: 2, supervisorPositionId: 0, orgLevel: 2 },
  { positionId: 3, supervisorPositionId: 1, orgLevel: 1 },
  { positionId: 3, supervisorPositionId: 0, orgLevel: 2 },
  { positionId: 4, supervisorPositionId: 3, orgLevel: 1 },
  { positionId: 4, supervisorPositionId: 1, orgLevel: 2 },
  { positionId: 4, supervisorPositionId: 0, orgLevel: 3 },
  { positionId: 5, supervisorPositionId: 3, orgLevel: 1 },
  { positionId: 5, supervisorPositionId: 1, orgLevel: 2 },
  { positionId: 5, supervisorPositionId: 0, orgLevel: 3 },
  { positionId: 6, supervisorPositionId: 4, orgLevel: 1 },
  { positionId: 6, supervisorPositionId: 3, orgLevel: 2 },
  { positionId: 6, supervisorPositionId: 1, orgLevel: 3 },
  { positionId: 6, supervisorPositionId: 0, orgLevel: 4 },
  { positionId: 7, supervisorPositionId: 2, orgLevel: 1 },
  { positionId: 7, supervisorPositionId: 1, orgLevel: 2 },
  { positionId: 7, supervisorPositionId: 0, orgLevel: 3 }
];

export const fullTgt: OrgSectionNode[] = createOrgSection(
  fakeOrgFullTargetRelationships
);

const fakeOrgHorizontalRelationships: OrgNodeKeys[] = [
  { positionId: 1, supervisorPositionId: 0, allSupervisors: [0, 1] },
  { positionId: 2, supervisorPositionId: 1, allSupervisors: [0, 1, 2] },
  { positionId: 3, supervisorPositionId: 1, allSupervisors: [0, 1, 3] },
  { positionId: 4, supervisorPositionId: 3, allSupervisors: [0, 1, 3, 4] },
  { positionId: 5, supervisorPositionId: 3, allSupervisors: [0, 1, 3, 5] },
  { positionId: 6, supervisorPositionId: 4, allSupervisors: [0, 1, 3, 4, 6] },
  { positionId: 7, supervisorPositionId: 2, allSupervisors: [0, 1, 2, 7] }
];

export const getNumberLength = (val: number) => ("" + val).length;

export const padOrgSortStringSegment = (id: number, padding) =>
  padding.substring(0, padding.length - getNumberLength(id)) + id + "";

export const createOrgSortString = (ids: number[]): string => {
  return ids
    .map((id: number, idx: number) => {
      const paddedId: string = padOrgSortStringSegment(id, "0000000000");
      return idx === 0 ? paddedId : "-" + paddedId;
    })
    .join("");
};

export const createOrdNodeWithSup = (orgNodeKeys: OrgNodeKeys): OrgNode => ({
  positionId: orgNodeKeys.positionId,
  supervisorPositionId: orgNodeKeys.supervisorPositionId,
  employee: {
    id: 100 + orgNodeKeys.positionId,
    firstName: "first name " + orgNodeKeys.positionId,
    lastName: "last name " + orgNodeKeys.positionId,
    gender: "gender " + orgNodeKeys.positionId,
    photoUrl: ""
  },
  // fix "!"
  orgSort: createOrgSortString(orgNodeKeys.allSupervisors!),
  allSupervisors: orgNodeKeys.allSupervisors
});

export const fakeOrgHorizontal: OrgNode[] = fakeOrgHorizontalRelationships.map(
  createOrdNodeWithSup
);

export const createOrdNodeWithSupFiltered = (
  posSuperSortOrgLevelSup: OrgNodeKeys
): OrgNode => ({
  positionId: posSuperSortOrgLevelSup.positionId,
  supervisorPositionId: posSuperSortOrgLevelSup.supervisorPositionId,
  employee: {
    id: 100 + posSuperSortOrgLevelSup.positionId,
    firstName: "first name " + posSuperSortOrgLevelSup.positionId,
    lastName: "last name " + posSuperSortOrgLevelSup.positionId,
    gender: "gender " + posSuperSortOrgLevelSup.positionId,
    photoUrl: ""
  },
  // fix the "!"
  orgSort: createOrgSortString(posSuperSortOrgLevelSup.allSupervisors!),
  allSupervisors: posSuperSortOrgLevelSup.allSupervisors
});
