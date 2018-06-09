import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Link, Text, Container } from "rebass";
import VOToolbar from "./toolbar.component";
import ViewOrg from "./view-org.component";
import NodeForm from "./node-form.component";
import { selectOrgNode, addOrgNode } from "../actions/org.actions";
import { setCloseNewOrgNodeForm } from "../actions/org-node-form.actions";
import {
  saveFormValueString,
  FormInstance,
  resetForms
} from "../../forms/actions/from.actions";
import { isNameValid } from "../../forms/selectors/forms.selector";
import {
  getOrgBySupervisor,
  getIterativeSupervisors
} from "../logic/org-logic";
import {
  OrgNode,
  CombinedState,
  FormStateEnum,
  AddNewOrgNodeFormState
} from "../types/org.types";

import system from "system-components";

const LinkSuperiors = system(
  {
    is: Link,
    weight: "bold",
    py: 0,
    pl: 1,
    color: "blue",
    borderLeft: "1px solid hotPink"
  },
  "borders"
).extend`
  overflow: scroll;
  display: block;
  flex-wrap: nowrap;
  text-decoration: none;
`;

const OrgView = ({
  onSelectOrgNode,
  onAddNewOrgNode,
  supervisorsOrg,
  supervisorChain,
  nextAvailableId,
  formState,
  formTargetNode,
  onUpdateNewName,
  nameValid = false,
  formValuesState
}: {
  onSelectOrgNode: (positionId: number) => void;
  onAddNewOrgNode: (
    newPositionId: number,
    currentNodeId: number,
    employeeFirstName: string,
    employeeLastName: string,
    employeeGender: string,
    employeePhotoUrl: string
  ) => void;
  supervisorsOrg: OrgNode[];
  supervisorChain: OrgNode[];
  nextAvailableId: number;
  formState: FormStateEnum;
  formTargetNode: number;
  onUpdateNewName: (field: string, newValue: string) => void;
  nameValid: boolean;
  formValuesState: AddNewOrgNodeFormState;
}) => {
  return (
    <div className="App">
      <VOToolbar />
      <Container>
        {formState === FormStateEnum.hidden ? (
          <Container pt={110}>
            <div>
              {/* filtering out positionId -1, temporarily, until we figure out how to handle 🕴 */}
              {supervisorChain
                .filter(sup => sup.positionId !== -1)
                .map((sup, supIndex) => (
                  <LinkSuperiors
                    href="#"
                    key={sup.positionId}
                    onClick={e => onSelectOrgNode(sup.positionId)}
                  >
                    {supIndex > 0 ? <Text color="hotpink">⌄</Text> : undefined}
                    {/* TODO: showing employee name, concatenated */}
                    {sup.employee.lastName + ", " + sup.employee.firstName}
                  </LinkSuperiors>
                ))}
            </div>
            <ViewOrg
              supervisorsOrg={supervisorsOrg}
              onSelectOrgNode={onSelectOrgNode}
            />
          </Container>
        ) : (
          <NodeForm
            formState={formState}
            formTargetNode={formTargetNode}
            onAddNewOrgNode={onAddNewOrgNode.bind(null, nextAvailableId)}
            onUpdateNewName={onUpdateNewName}
            nameValid={nameValid}
            formValuesState={formValuesState}
          />
        )}
      </Container>
    </div>
  );
};

const organizationNodes = (state: CombinedState) =>
  state.orgReducer.organization;

const selectedNode = (state: CombinedState) => state.orgReducer.selectedOrgNode;

// TODO Fix this:
const supervisorsOrganizationWithEmployeeNames = createSelector(
  organizationNodes,
  selectedNode,
  (orgNodes: OrgNode[], selectedEe: number) => {
    return getOrgBySupervisor(orgNodes, selectedEe);
  }
);

const organizationWithEmployeeNames = createSelector(
  organizationNodes,
  (org: OrgNode[]) => {
    const orgWithAllSups = org.map(orgNode =>
      getIterativeSupervisors(orgNode, org)
    );
    return orgWithAllSups;
  }
);

const addNewNodeFormState = (state: CombinedState) =>
  state.formReducer[FormInstance.NewNodeForm];

const orgForSelectedOrgNode = createSelector(
  organizationWithEmployeeNames,
  selectedNode,
  (org: OrgNode[], node: number): OrgNode[] => {
    const selectedOrgNode = org.find(orgNode => orgNode.positionId === node);
    if (!selectedOrgNode) {
      return org;
    }
    return selectedOrgNode!.allSupervisors!.map(supId => {
      if (supId === 0) {
        // for now the top supervisor will report to a man in a business suit levitating
        return {
          positionId: -1,
          supervisorPositionId: -1,
          employeeId: -1,
          employeeName: "🕴",
          employee: {
            id: -1,
            firstName: "🕴",
            lastName: "🕴",
            gender: "",
            photoUrl: ""
          }
        };
      }
      return org!.find(
        org2 =>
          org2.employee.id ===
          org.find(orgNode => orgNode!.positionId === supId)!.employee.id
      )!;
    });
  }
);

const nextAvailableIdSelector = createSelector(
  organizationWithEmployeeNames,
  (org: OrgNode[]) => {
    return Math.max(...org.map(orgNode => orgNode.positionId)) + 1;
  }
);

const mapStateToProps = (state: CombinedState) => {
  return {
    supervisorsOrg: supervisorsOrganizationWithEmployeeNames(state),
    supervisorChain: orgForSelectedOrgNode(state),
    nextAvailableId: nextAvailableIdSelector(state),
    formState: state.orgNodeFormReducer.state,
    formTargetNode: state.orgNodeFormReducer.targetNode,
    formValuesState: addNewNodeFormState(state),
    nameValid: isNameValid(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectOrgNode: positionId => dispatch(selectOrgNode(positionId)),
    onAddNewOrgNode: (
      newPositionId: number,
      currentNodeId: number,
      employeeFirstName: string,
      employeeLastName: string,
      employeeGender: string,
      employeePhotoUrl: string
    ) => {
      dispatch(
        addOrgNode(
          newPositionId,
          currentNodeId,
          employeeFirstName,
          employeeLastName,
          employeeGender,
          employeePhotoUrl
        )
      );
      dispatch(setCloseNewOrgNodeForm());
      dispatch(resetForms());
    },
    onUpdateNewName: (field: string, newValue: string) =>
      dispatch(saveFormValueString(FormInstance.NewNodeForm, field, newValue))
  };
};

const MainOrgView = connect(mapStateToProps, mapDispatchToProps)(OrgView);

export default MainOrgView;
