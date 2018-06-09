import * as React from "react";
import { OrgNode } from "../types/org.types";
import { Border, Text, Flex, Box, Container } from "rebass";
import styled from "styled-components";
import { space } from "styled-system";

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
  ${space};
` as React.ReactType;

export default ({
  supervisorsOrg,
  onSelectOrgNode
}: {
  supervisorsOrg: OrgNode[];
  onSelectOrgNode: Function;
}) => {
  return (
    <Container>
      <Box pl={2} />
      <Ul p={2}>
        {!supervisorsOrg.length ? <div>none</div> : null}
        {supervisorsOrg
          .sort(
            (item1, item2) =>
              (item1.orgSort || "") >= (item2.orgSort || "") ? 1 : -1
          )
          .map(orgNode => {
            return (
              <Border
                is="li"
                key={orgNode.positionId}
                width={1}
                borderColor="hotpink"
                mt={1}
                p={0}
              >
                <Flex
                  width={1}
                  p={1}
                  onClick={e => onSelectOrgNode(orgNode.positionId)}
                  is="a"
                >
                  <Box width={orgNode.allSupervisors!.length + "rem"} />
                  <Text color="black" fontSize={1} fontWeight="bold">
                    {orgNode.employee.lastName +
                      ", " +
                      orgNode.employee.firstName}
                  </Text>
                </Flex>
              </Border>
            );
          })}
      </Ul>
    </Container>
  );
};
