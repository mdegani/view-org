import * as React from "react";
import "mdd-tailwind";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import ViewOrg from "./components/ViewOrg";
import NodeForm from "./components/NodeForm";
import {
  selectEmployee,
  addNewEmployee,
  deleteAllEmployees,
  deleteEmployee,
  startAddNewEmployee,
  doneEditingNode,
  updateNewName
} from "./store/actions";
import {
  getOrganizationBySupervisor,
  getIterativeSupervisors,
  getOrganizationNodeById
} from "./org/logic/org.logic";
import "./App.css";
import {
  OrganizationNode,
  CombinedState,
  FormState
} from "./org/types/org.types";

const OrgView = ({
  selectedEmployee,
  organization,
  onSelectEmployee,
  onAddNewEmployee,
  onDeleteAllEmployees,
  onDeleteEmployee,
  supervisorsOrg,
  supervisorChain,
  nextAvailableId,
  editingNode,
  formState,
  formTargetNode,
  onStartAddNewEmployee,
  onDoneEditingNode,
  onUpdateNewName,
  nameValid
}: {
  selectedEmployee: string;
  organization: OrganizationNode[];
  // TODO: better typing for this function https://www.typescriptlang.org/docs/handbook/functions.html
  onSelectEmployee: Function;
  onAddNewEmployee: (newPositionId: number, currentNodeId: number) => void; // TODO: is void right??
  onDeleteAllEmployees: () => void;
  onDeleteEmployee: (newPositionId: number) => void;
  supervisorsOrg: OrganizationNode[];
  supervisorChain: OrganizationNode[];
  nextAvailableId: number;
  editingNode: number;
  formState: FormState;
  formTargetNode: number;
  onStartAddNewEmployee: Function;
  onDoneEditingNode: Function;
  onUpdateNewName: Function;
  nameValid: boolean;
}) => {
  return (
    <div className="App">
      <nav className="bg-black w-full fixed flex flex-col">
        <div className="font-bold text-base text-hot-pink py-2">
          Organization View
        </div>
        <div className="flex justify-between">
          <div className="text-2xl p-2 bg-white overflow-scroll flex-no-wrap w-full">
            {
              getOrganizationNodeById(organization, +selectedEmployee)!
                .employeeName
            }
          </div>
          <a
            href="#"
            className="text-sm no-underline opacity-100 px-3 ph-1 mb-2 inline-block text-white"
            // onClick={() => onAddNewEmployee(nextAvailableId, +selectedEmployee)}
            onClick={() => onStartAddNewEmployee(+selectedEmployee)}
          >
            +
          </a>
          <a
            href="#"
            className="text-sm no-underline opacity-100 px-3 py-1 mb-2 inline-block text-white"
            onClick={() => onDeleteAllEmployees()}
          >
            del all
          </a>
          <a
            href="#"
            className="text-sm no-underline opacity-100 px-3 ph-1 mb-2 inline-block text-white"
            onClick={() => onDeleteEmployee(+selectedEmployee)}
          >
            del one
          </a>
        </div>
      </nav>
      <div className="px-8" style={{ paddingTop: "5.3rem" }}>
        {formState === FormState.hidden ? (
          <>
            <div>
              {/* this should be positions! */}
              {/* filtering out positionId -1, temporarily, until we figure out how to handle 🕴 */}
              {supervisorChain
                .filter(sup => sup.positionId !== -1)
                .map((sup, supIndex) => (
                  <a
                    href="#"
                    key={sup.employeeId}
                    className={
                      "text-base font-semibold py-0 text-blue no-underline opacity-100 block border-l " +
                      "pl-1 border-hot-pink overflow-scroll flex-no-wrap"
                    }
                    onClick={e => onSelectEmployee(sup.positionId)}
                  >
                    {supIndex > 0 ? (
                      <span className="text-sm text-hot-pink block">⌄</span>
                    ) : (
                      undefined
                    )}
                    {sup.employeeName}
                  </a>
                ))}
            </div>
            <ViewOrg
              supervisorsOrg={supervisorsOrg}
              onSelectEmployee={onSelectEmployee}
            />
          </>
        ) : (
          <NodeForm
            formState={formState}
            formTargetNode={formTargetNode}
            onAddNewEmployee={onAddNewEmployee.bind(null, nextAvailableId)}
            onUpdateNewName={onUpdateNewName}
            nameValid={nameValid}
          />
        )}
      </div>
    </div>
  );
};

const organizationNodes = state => state.employeesReducer.organization;

const selectedNode = state => state.employeesReducer.selectedEmployee;

// TODO Fix this:
const supervisorsOrganizationWithEmployeeNames = createSelector(
  organizationNodes,
  selectedNode,
  (orgNodes: OrganizationNode[], selectedEe: number) => {
    return getOrganizationBySupervisor(orgNodes, selectedEe);
  }
);

const organizationWithEmployeeNames = createSelector(
  organizationNodes,
  (org: OrganizationNode[]) => {
    const orgWithAllSups = org.map(orgNode =>
      getIterativeSupervisors(orgNode, org)
    );
    return orgWithAllSups;
  }
);

const organizationNodeSelectedEmployee = createSelector(
  organizationWithEmployeeNames,
  selectedNode,
  (org: OrganizationNode[], node: number): OrganizationNode[] => {
    const selectedOrgNode = org.find(orgNode => orgNode.positionId === node);
    return selectedOrgNode!.allSups!.map(supId => {
      if (supId === 0) {
        // for now the top supervisor will report to a man in a business suit levitating
        return {
          positionId: -1,
          supervisorPositionId: -1,
          employeeId: -1,
          employeeName: "🕴"
        };
      }
      return org!.find(
        org2 =>
          org2.employeeId ===
          org.find(orgNode => orgNode!.positionId === supId)!.employeeId
      )!;
    });
  }
);

const nextAvailableIdSelector = createSelector(
  organizationWithEmployeeNames,
  (org: OrganizationNode[]) => {
    return Math.max(...org.map(orgNode => orgNode.positionId)) + 1;
  }
);

const mapStateToProps = (state: CombinedState) => {
  return {
    selectedEmployee: state.employeesReducer.selectedEmployee,
    organization: organizationWithEmployeeNames(state),
    supervisorsOrg: supervisorsOrganizationWithEmployeeNames(state),
    supervisorChain: organizationNodeSelectedEmployee(state),
    nextAvailableId: nextAvailableIdSelector(state),
    formState: state.employeesReducer.nodeForm.state,
    formTargetNode: state.employeesReducer.nodeForm.targetNode,
    nameValid: state.employeesReducer.nodeForm.newName.length > 2
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectEmployee: positionId => dispatch(selectEmployee(positionId)),
    onAddNewEmployee: (newPositionId, currentNodeId, employeeName) =>
      dispatch(addNewEmployee(newPositionId, currentNodeId, employeeName)),
    onDeleteAllEmployees: () => dispatch(deleteAllEmployees()),
    onDeleteEmployee: positionId => dispatch(deleteEmployee(positionId)),
    onStartAddNewEmployee: (supervisorNode, newName) =>
      dispatch(startAddNewEmployee(supervisorNode, newName)),
    onDoneEditingNode: () => dispatch(doneEditingNode()),
    onUpdateNewName: (newName: string) => dispatch(updateNewName(newName))
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(OrgView);

export default App;
