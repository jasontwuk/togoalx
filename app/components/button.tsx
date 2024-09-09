import clsx from "clsx";
import React from "react";

type ButtonProps = {
  className?: string;
  full?: boolean;
  clickHandler?: () => void;
  children: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { className, full, clickHandler, children } = props;

  return (
    <button
      onClick={clickHandler}
      className={clsx(
        full && "w-full",
        "rounded-full overflow-hidden border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white  duration-200 capitalize font-semibold whitespace-nowrap ",
        className
      )}
    >
      {children}
    </button>
  );
};
