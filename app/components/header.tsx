import React from "react";
import clsx from "clsx";
import Link from "next/link";

import { kalam } from "../utilities/fonts";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 sm:p-8 gap-4">
      <Link
        href={"/"}
        className={clsx(kalam.className, "text-2xl font-bold text-indigo-500")}
      >
        ToGoalx
      </Link>

      <button className="py-0.5 px-2 border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white rounded-lg duration-200 capitalize font-semibold">
        log in
      </button>
    </div>
  );
};
