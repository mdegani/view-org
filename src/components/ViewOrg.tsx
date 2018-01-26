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
      <ul className="list pl0 ml0 center">
        {!supervisorsOrg.length ? <div>none</div> : null}
        {supervisorsOrg
          .sort(
            (item1, item2) =>
              (item1.orgSort || "") >= (item2.orgSort || "") ? 1 : -1
          )
          .map(organizationNode => {
            return (
              <li key={organizationNode.positionId} className="pa0 flex">
                <button
                  className={[
                    "flex items-start flex-auto f5 fw6 pa1 mt1 link",
                    "dim db bl pl1 b--pink ba dib overflow-scroll nowrap"
                  ].join(" ")}
                  onClick={e => onSelectEmployee(organizationNode.positionId)}
                >
                  {(organizationNode.allSups!.splice(2) || []).map(sup => (
                    <span
                      key={sup}
                      className="dib"
                      style={{ minWidth: "2rem" }}
                    />
                  ))}
                  {organizationNode.employeeName}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
