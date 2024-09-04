import clsx from "clsx";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-8 gap-2">
      <p className="text-base text-center">
        <i className="fa-regular fa-copyright"></i> 2024 - present ∙ All Rights
        Reserved
      </p>

      <p className="text-base text-center">
        Created by{" "}
        <Link
          target="blank"
          href={"https://github.com/jasontwuk"}
          className={clsx("hover:text-indigo-500 duration-200 font-bold")}
        >
          Jason Liao
        </Link>
      </p>
    </div>
  );
};
