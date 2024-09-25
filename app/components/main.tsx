import React from "react";

// *** Note: children prop type
type ContainerProps = {
  children: React.ReactNode;
};

export const Main = (props: ContainerProps) => {
  const { children } = props;

  return (
    <div className="flex flex-1 flex-col gap-4 py-4 sm:py-8">{children}</div>
  );
};
