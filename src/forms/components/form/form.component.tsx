import * as React from "react";
import system from "system-components";

const Form = system({
  is: "form"
}).extend`
  padding-top: 120px;
`;

export default ({
  children,
  onSubmit
}: {
  children: React.ReactNode;
  onSubmit: Function;
}) => {
  return <Form onSubmit={onSubmit}>{children}</Form>;
};
