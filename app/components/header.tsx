"use client";

import React from "react";
import clsx from "clsx";
import Link from "next/link";

import { kalam } from "../utilities/fonts";
import { useAuth } from "../utilities/authContext";
import Logout from "./logout";

export const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 sm:p-8 gap-4">
      <Link
        href={"/"}
        className={clsx(kalam.className, "text-2xl font-bold text-indigo-500")}
      >
        ToGoalx
      </Link>

      {currentUser ? (
        <div className="flex justify-center items-center gap-2">
          <Logout />
        </div>
      ) : (
        <Link
          href={"/login"}
          className="py-0.5 px-2 rounded-full overflow-hidden border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white  duration-200 capitalize font-semibold"
        >
          log in
        </Link>
      )}
    </div>
  );
};
