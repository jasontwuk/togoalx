import React from "react";

import Link from "next/link";
import clsx from "clsx";
import { kalam } from "../utilities/fonts";

type StyledLinkProps = {
  href: string;
  target?: string;
  isBorder?: boolean;
  isPlain?: boolean;
  isKalam?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const StyledLink = (props: StyledLinkProps) => {
  const { href, target, isBorder, isPlain, isKalam, className, children } =
    props;

  return (
    <Link
      href={href}
      target={target}
      className={clsx(
        // *** Note: text colour
        "text-indigo-500",

        // *** Note: has border
        isBorder &&
          "flex items-center justify-center gap-2 overflow-hidden rounded-full border border-indigo-500 px-2 py-0.5 font-semibold capitalize duration-200 hover:bg-indigo-500 hover:text-white",

        // *** Note: plain (no border)
        isPlain && "rounded-sm font-bold hover:text-indigo-400",

        // *** Note: use Kalam google font
        isKalam && kalam.className,

        // *** Note: focus-visible
        "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-yellow-500",
        className,
      )}
    >
      {children}
    </Link>
  );
};
