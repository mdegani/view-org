import { OrgNode, OrgSectionNode } from "../../types/org.types";

export const createOrgNode = (posSuper: number[]): OrgNode => ({
  positionId: posSuper[0],
  supervisorPositionId: posSuper[1],
  employee: {
    id: 100 + posSuper[0],
    firstName: "first name " + posSuper[0],
    lastName: "last name " + posSuper[0],
    gender: "gender " + posSuper[0],
    photoUrl: ""
  }
});

export const createOrg = (posSuperList: number[][]) =>
  posSuperList.map((posSuper: number[]): OrgNode => {
    return createOrgNode(posSuper);
  });

export const createOrgSection = (posSuperLevelList: number[][]) =>
  posSuperLevelList.map((posSuperLevel: number[]): OrgSectionNode => {
    return {
      positionId: posSuperLevel[0],
      supervisorPositionId: posSuperLevel[1],
      employee: {
        id: 100 + posSuperLevel[0],
        firstName: "first name " + posSuperLevel[0],
        lastName: "last name " + posSuperLevel[0],
        gender: "gender " + posSuperLevel[0],
        photoUrl: ""
      },
      orgLevel: posSuperLevel[2]
    };
  });

const fakeOrgRelationships = [
  [1, 0],
  [2, 1],
  [3, 1],
  [4, 3],
  [5, 3],
  [6, 4],
  [7, 2]
]; // [positionId, supervisorPositionId]

export const fakeOrg: OrgNode[] = createOrg(fakeOrgRelationships);

const fakeOrgFullTargetRelationships = [
  [1, 0, 1],
  [2, 1, 1],
  [2, 0, 2],
  [3, 1, 1],
  [3, 0, 2],
  [4, 3, 1],
  [4, 1, 2],
  [4, 0, 3],
  [5, 3, 1],
  [5, 1, 2],
  [5, 0, 3],
  [6, 4, 1],
  [6, 3, 2],
  [6, 1, 3],
  [6, 0, 4],
  [7, 2, 1],
  [7, 1, 2],
  [7, 0, 3]
]; // [positionId, supervisorPositionId, orgLevel]

export const fullTgt: OrgSectionNode[] = createOrgSection(
  fakeOrgFullTargetRelationships
);

const fakeOrgHorizontalRelationships = [
  [1, 0, [0, 1]],
  [2, 1, [0, 1, 2]],
  [3, 1, [0, 1, 3]],
  [4, 3, [0, 1, 3, 4]],
  [5, 3, [0, 1, 3, 5]],
  [6, 4, [0, 1, 3, 4, 6]],
  [7, 2, [0, 1, 2, 7]]
];

// TODO: this needs a test!
const createOrgSortString = (ids: number[]): string => {
  return ids
    .map((id: number, idx: number) => {
      const padding = "0000000000";
      const idLength = ("" + id).length;
      const paddedId: string = padding.substring(0, 10 - idLength) + id + "";
      return idx === 0 ? paddedId : "-" + paddedId;
    })
    .join("");
};

// TODO: better types for the array of array inputs
// TODO: instead of getting values out of, could use variables (or just use objects with properties as above)
// tslint:disable-next-line:no-any
export const createOrdNodeWithSup = (posSuperSort: any): OrgNode => ({
  positionId: posSuperSort[0],
  supervisorPositionId: posSuperSort[1],
  employee: {
    id: 100 + posSuperSort[0],
    firstName: "first name " + posSuperSort[0],
    lastName: "last name " + posSuperSort[0],
    gender: "gender " + posSuperSort[0],
    photoUrl: ""
  },
  orgSort: createOrgSortString(posSuperSort[2]),
  allSupervisors: posSuperSort[2]
});

export const fakeOrgHorizontal: OrgNode[] = fakeOrgHorizontalRelationships.map(
  createOrdNodeWithSup
);

export const createOrdNodeWithSupFiltered = (
  posSuperSortOrgLevelSup: any
): any => ({
  positionId: posSuperSortOrgLevelSup[0],
  supervisorPositionId: posSuperSortOrgLevelSup[1],
  orgLevel: posSuperSortOrgLevelSup[3],
  orgSup: posSuperSortOrgLevelSup[2][0],
  employee: {
    id: 100 + posSuperSortOrgLevelSup[0],
    firstName: "first name " + posSuperSortOrgLevelSup[0],
    lastName: "last name " + posSuperSortOrgLevelSup[0],
    gender: "gender " + posSuperSortOrgLevelSup[0],
    photoUrl: ""
  },
  orgSort: createOrgSortString(posSuperSortOrgLevelSup[2]),
  allSupervisors: posSuperSortOrgLevelSup[2]
});
