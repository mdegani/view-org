import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Toolbar from "./toolbar.component";
import ViewOrg from "./view-org.component";
import NodeForm from "./node-form.component";
import { selectOrgNode, addOrgNode } from "../actions/org.actions";
import { setCloseNewOrgNodeForm } from "../actions/org-node-form.actions";
import {
  saveFormValueString,
  FormInstance,
  resetForms
} from "../../forms/actions/from.actions";
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

const OrgView = ({
  onSelectOrgNode,
  onAddNewOrgNode,
  supervisorsOrg,
  supervisorChain,
  nextAvailableId,
  formState,
  formTargetNode,
  onUpdateNewName,
  nameValid,
  formValuesState
}: {
  // TODO: better typing for this function https://www.typescriptlang.org/docs/handbook/functions.html
  onSelectOrgNode: Function;
  onAddNewOrgNode: (newPositionId: number, currentNodeId: number) => void; // TODO: is void right??
  supervisorsOrg: OrgNode[];
  supervisorChain: OrgNode[];
  nextAvailableId: number;
  formState: FormStateEnum;
  formTargetNode: number;
  onUpdateNewName: Function;
  nameValid: boolean;
  formValuesState: AddNewOrgNodeFormState;
}) => {
  return (
    <div className="App">
      <Toolbar />
      <div className="px-8" style={{ paddingTop: "5.3rem" }}>
        {formState === FormStateEnum.hidden ? (
          <>
            <div>
              {/* filtering out positionId -1, temporarily, until we figure out how to handle 🕴 */}
              {supervisorChain
                .filter(sup => sup.positionId !== -1)
                .map((sup, supIndex) => (
                  <a
                    href="#"
                    // TODO: is sup.employee.id the right key? Shouldn't it be the position id?
                    key={sup.employee.id}
                    className={
                      "text-base font-semibold py-0 text-blue no-underline opacity-100 block border-l " +
                      "pl-1 border-hot-pink overflow-scroll flex-no-wrap"
                    }
                    onClick={e => onSelectOrgNode(sup.positionId)}
                  >
                    {supIndex > 0 ? (
                      <span className="text-sm text-hot-pink block">⌄</span>
                    ) : (
                      undefined
                    )}
                    {/* TODO: showing employee name, concatenated */}
                    {sup.employee.lastName + ", " + sup.employee.firstName}
                  </a>
                ))}
            </div>
            <ViewOrg
              supervisorsOrg={supervisorsOrg}
              onSelectOrgNode={onSelectOrgNode}
            />
          </>
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
      </div>
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
    formValuesState: addNewNodeFormState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectOrgNode: positionId => dispatch(selectOrgNode(positionId)),
    onAddNewOrgNode: (
      newPositionId,
      currentNodeId,
      employeeFirstName,
      employeeLastName,
      employeeGender,
      employeePhotoUrl
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
