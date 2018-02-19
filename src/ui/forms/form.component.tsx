import * as React from "react";

export default ({
  children,
  className,
  onSubmit
}: {
  children: React.ReactNode;
  className: string;
  // tslint:disable-next-line:no-any
  onSubmit: any;
}) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
