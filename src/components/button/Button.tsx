import * as React from "react";

export default ({
  handleOnClick
}: {
  // tslint:disable-next-line:no-any
  handleOnClick: any;
}) => {
  return (
    <button className="btn btn-blue" onClick={handleOnClick}>
      Button
    </button>
  );
};
