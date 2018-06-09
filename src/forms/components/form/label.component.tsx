import * as React from "react";
import { Flex, Box, Label } from "rebass";

export default ({
  children,
  text
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <Flex>
      <Box mb={2}>
        <Label color="blue" fontSize={2} fontWeight="bold">
          {text}
        </Label>
        {children}
      </Box>
    </Flex>
  );
};
