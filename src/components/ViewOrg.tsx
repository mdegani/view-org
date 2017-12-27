import * as React from "react";
import { OrganizationNode } from "../store/organization.types";

export default ({
  supervisorsOrg,
  onSelectEmployee
}: {
  supervisorsOrg: OrganizationNode[];
  onSelectEmployee: Function;
}) => {
  return (
    <div className="measure">
      <span className="pt3 f6 b db mb2">
        direct and indirect reports for this employee
      </span>
      <ul className="list pl0 ml0 center ba b--light-silver br3 bg-white">
        {!supervisorsOrg.length ? <div>none</div> : null}
        {supervisorsOrg
          .sort(
            (item1, item2) =>
              (item1.orgSort || "") >= (item2.orgSort || "") ? 1 : -1
          )
          .map(organizationNode => {
            return (
              <li
                key={organizationNode.positionId}
                className="ph3 pv2 bb b--light-silver"
              >
                <span className="washed-blue">
                  {"----".repeat((organizationNode.allSups || []).length)}
                </span>
                <button
                  className="f6 link dim br1 ba ph3 pv2 mb2 dib black"
                  onClick={e => onSelectEmployee(organizationNode.positionId)}
                >
                  ➤ {organizationNode.employeeName}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
