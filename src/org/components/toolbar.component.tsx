import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {
  deleteOrgNode,
  deleteAllOrgNodes,
  startAddNewOrgNode
} from "../actions/org.actions";
import { OrgNode, CombinedState } from "../types/org.types";
import { getOrgNodeById, getIterativeSupervisors } from "../logic/org.logic";

const component = ({
  organization,
  selectedOrgNode,
  onStartAddNewOrgNode,
  onDeleteAllOrgNodes,
  onDeleteOrgNode
}: {
  organization: OrgNode[];
  selectedOrgNode: string;
  onStartAddNewOrgNode: Function;
  onDeleteAllOrgNodes: () => void;
  onDeleteOrgNode: (newPositionId: number) => void;
}) => {
  return (
    <nav className="bg-black w-full fixed flex flex-col">
      <div className="font-bold text-base text-hot-pink py-2">
        Organization View
      </div>
      <div className="flex justify-between">
        <div className="text-2xl p-2 bg-white overflow-scroll flex-no-wrap w-full">
          {getOrgNodeById(organization, +selectedOrgNode)!.employeeName}
        </div>
        <a
          href="#"
          className="text-sm no-underline opacity-100 px-3 ph-1 mb-2 inline-block text-white"
          onClick={() => onStartAddNewOrgNode(+selectedOrgNode)}
        >
          +
        </a>
        <a
          href="#"
          className="text-sm no-underline opacity-100 px-3 py-1 mb-2 inline-block text-white"
          onClick={() => onDeleteAllOrgNodes()}
        >
          del all
        </a>
        <a
          href="#"
          className="text-sm no-underline opacity-100 px-3 ph-1 mb-2 inline-block text-white"
          onClick={() => onDeleteOrgNode(+selectedOrgNode)}
        >
          del one
        </a>
      </div>
    </nav>
  );
};

const organizationNodes = state => state.orgReducer.organization;

const organizationWithEmployeeNames = createSelector(
  organizationNodes,
  (org: OrgNode[]) => {
    const orgWithAllSups = org.map(orgNode =>
      getIterativeSupervisors(orgNode, org)
    );
    return orgWithAllSups;
  }
);

const mapStateToProps = (state: CombinedState) => {
  return {
    selectedOrgNode: state.orgReducer.selectedEmployee,
    organization: organizationWithEmployeeNames(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteAllOrgNodes: () => dispatch(deleteAllOrgNodes()),
    onDeleteOrgNode: positionId => dispatch(deleteOrgNode(positionId)),
    onStartAddNewOrgNode: (supervisorNode, newName) =>
      dispatch(startAddNewOrgNode(supervisorNode, newName))
  };
};

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(component);

export default Toolbar;
