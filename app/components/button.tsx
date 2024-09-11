import clsx from "clsx";
import React from "react";

type ButtonProps = {
  className?: string;
  full?: boolean;
  dark?: boolean;
  clickHandler?: () => void;
  children: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { className, full, dark, clickHandler, children } = props;

  return (
    <button
      onClick={clickHandler}
      className={clsx(
        full && "w-full",
        dark
          ? "hover:opacity-80 bg-indigo-700 text-white"
          : "hover:bg-indigo-500 text-indigo-500 hover:text-white",
        "rounded-full overflow-hidden border border-indigo-500 duration-200 capitalize font-semibold whitespace-nowrap ",
        className
      )}
    >
      {children}
    </button>
  );
};
