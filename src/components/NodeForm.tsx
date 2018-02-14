import * as React from "react";
import { FormState } from "../store/organization.types";
import Label from "../components/forms/Label";
import Input from "../components/forms/Input";
import Button from "../components/button/Button";

export default ({
  formState,
  formTargetNode,
  onDoneEditingNode
}: {
  formState: FormState;
  formTargetNode: number;
  onDoneEditingNode: Function;
}) => {
  return (
    <>
      {/* <div> Node Form </div>
      <div> Form type: {formState}</div>
      <div> Target node: {formTargetNode}</div>
      <a href="#" onClick={() => onDoneEditingNode()}>
        Done
      </a> */}
      <form className="w-full max-w-md">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label text="First Name">
              <Input type="text" placeholder="Jane" />
            </Label>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label text="Last Name">
              <Input type="text" placeholder="Doe" />
            </Label>
          </div>
        </div>
      </form>
      <Button handleOnClick={onDoneEditingNode} />
    </>
  );
};
