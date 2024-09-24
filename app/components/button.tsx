import clsx from "clsx";
import React from "react";

type ButtonProps = {
  className?: string;
  full?: boolean;
  dark?: boolean;
  disabled?: boolean;
  clickHandler?: () => void;
  children: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { className, full, dark, disabled, clickHandler, children } = props;

  return (
    <button
      onClick={clickHandler}
      disabled={disabled}
      className={clsx(
        full && "w-full",
        dark
          ? "bg-indigo-700 text-white hover:opacity-80"
          : "text-indigo-500 hover:bg-indigo-500 hover:text-white",
        "overflow-hidden whitespace-nowrap rounded-full border border-indigo-500 font-semibold capitalize duration-200 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-yellow-500",
        className,
        disabled &&
          "!border-gray-200 !bg-gray-200 !text-gray-500 hover:bg-gray-200 hover:text-gray-500",
      )}
    >
      {children}
    </button>
  );
};
