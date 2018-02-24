import * as React from "react";

export default ({
  children,
  text
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <label className="block tracking-wide text-blue text-xs font-semibold mb-2">
      {text}
      {children}
    </label>
  );
};
