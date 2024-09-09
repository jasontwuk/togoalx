import React from "react";

// *** Note: children prop type
type ContainerProps = {
  children: React.ReactNode;
};

export const Main = (props: ContainerProps) => {
  const { children } = props;

  return <div className="flex-1 flex flex-col p-4 sm:p-8">{children}</div>;
};
