import * as React from "react";
import { OrgNode } from "../types/org.types";

export default ({
  supervisorsOrg,
  onSelectOrgNode
}: {
  supervisorsOrg: OrgNode[];
  onSelectOrgNode: Function;
}) => {
  return (
    <div className="max-w-sm">
      <ul className="list-reset pl-0 ml-0 py-4 mx-auto">
        {!supervisorsOrg.length ? <div>none</div> : null}
        {supervisorsOrg
          .sort(
            (item1, item2) =>
              (item1.orgSort || "") >= (item2.orgSort || "") ? 1 : -1
          )
          .map(orgNode => {
            return (
              <li key={orgNode.positionId} className="p-0 flex">
                <button
                  className={
                    "flex items-start flex-auto text-sm font-semibold p-1 mt-1 no-underline" +
                    "opacity-100 block border-l pl-1 border-hot-pink border inline-block overflow-scroll flex-no-wrap"
                  }
                  onClick={e => onSelectOrgNode(orgNode.positionId)}
                >
                  {(orgNode.allSupervisors!.splice(2) || []).map(sup => (
                    <span
                      key={sup}
                      className="inline-block"
                      style={{ minWidth: "2rem" }}
                    />
                  ))}
                  {orgNode.employeeName}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
