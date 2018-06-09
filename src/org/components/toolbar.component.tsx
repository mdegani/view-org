import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { deleteOrgNode, deleteAllOrgNodes } from "../actions/org.actions";
import { setOpenNewOrgNodeForm } from "../actions/org-node-form.actions";
import { OrgNode, CombinedState } from "../types/org.types";
import { getOrgNodeById, getIterativeSupervisors } from "../logic/org-logic";
import { Toolbar, Heading, NavLink, Image, Fixed } from "rebass";

// TODO: there has to be a better way!
const FixedFullWidth = Fixed.extend`
  width: 100%;
`;

const component = ({
  organization,
  selectedOrgNode,
  onSetOpenNewOrgNodeForm,
  onDeleteAllOrgNodes,
  onDeleteOrgNode
}: {
  organization: OrgNode[];
  selectedOrgNode: string;
  onSetOpenNewOrgNodeForm: Function;
  onDeleteAllOrgNodes: () => void;
  onDeleteOrgNode: (newPositionId: number) => void;
}) => {
  if (!getOrgNodeById(organization, +selectedOrgNode)) {
    onDeleteAllOrgNodes();
  }

  return getOrgNodeById(organization, +selectedOrgNode) ? (
    <FixedFullWidth width={"100%"}>
      <Toolbar bg="black" top={true} left={true} right={true} width={1}>
        <Heading weight="bold" fontSize={3} color="hotpink" py={2}>
          Organization View
        </Heading>
        <NavLink
          ml="auto"
          onClick={() => onSetOpenNewOrgNodeForm(+selectedOrgNode)}
        >
          +
        </NavLink>
        <NavLink onClick={() => onDeleteAllOrgNodes()}>del all</NavLink>
        <NavLink onClick={() => onDeleteOrgNode(+selectedOrgNode)}>
          del one
        </NavLink>
      </Toolbar>
      <Toolbar bg="gray" color="black">
        {getOrgNodeById(organization, +selectedOrgNode)!.employee.lastName +
          ", " +
          getOrgNodeById(organization, +selectedOrgNode)!.employee.firstName}
        <Image
          src={
            getOrgNodeById(organization, +selectedOrgNode)!.employee.photoUrl
          }
          width={20}
        />
      </Toolbar>
    </FixedFullWidth>
  ) : (
    <Heading>No Employees!</Heading>
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
    selectedOrgNode: state.orgReducer.selectedOrgNode,
    organization: organizationWithEmployeeNames(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteAllOrgNodes: () => dispatch(deleteAllOrgNodes()),
    onDeleteOrgNode: positionId => dispatch(deleteOrgNode(positionId)),
    onSetOpenNewOrgNodeForm: (supervisorNode, newName) =>
      dispatch(setOpenNewOrgNodeForm(supervisorNode, newName))
  };
};

const VOToolbar = connect(mapStateToProps, mapDispatchToProps)(component);

export default VOToolbar;
