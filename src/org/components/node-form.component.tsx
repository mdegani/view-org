import * as React from "react";
import { FormStateEnum, AddNewOrgNodeFormState } from "../types/org.types";
import { Flex, Container, Image, Box } from "rebass";
import VOLabel from "../../forms/components/form/label.component";
import VOInput from "../../forms/components/form/input.component";
import SubmitButton from "../../forms/components/button/button.component";
import Form from "../../forms/components/form/form.component";
import { FormInstance } from "../../forms/actions/from.actions";

export default ({
  formState,
  formTargetNode,
  onAddNewOrgNode,
  onUpdateNewName,
  nameValid,
  formValuesState
}: {
  formState: FormStateEnum;
  formTargetNode: number;
  onAddNewOrgNode: (
    currentNodeId: number,
    employeeFirstName: string,
    employeeLastName: string,
    employeeGender: string,
    employeePhotoUrl: string
  ) => void;
  onUpdateNewName: (field: string, newValue: string) => void;
  nameValid: boolean;
  formValuesState: AddNewOrgNodeFormState;
}) => {
  return (
    <Form
      onSubmit={() => {
        onAddNewOrgNode(
          formTargetNode,
          formValuesState.firstName,
          formValuesState.lastName,
          formValuesState.gender,
          formValuesState.picture
        );
      }}
    >
      <Flex mx={3}>
        <Container width={1} px={1}>
          <VOLabel text="First Name">
            <VOInput
              placeholder="Jane"
              fieldName="firstName"
              formName={FormInstance.NewNodeForm}
            />
          </VOLabel>
          <VOLabel text="Last Name">
            <VOInput
              placeholder="Doe"
              fieldName="lastName"
              formName={FormInstance.NewNodeForm}
            />
          </VOLabel>
          <Image src={formValuesState.picture} alt="employee picture" />
        </Container>
      </Flex>
      <Box p={3}>
        <SubmitButton /> Valid:{nameValid ? "VALID" : "NOT VALID"}
      </Box>
    </Form>
  );
};
