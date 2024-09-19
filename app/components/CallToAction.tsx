"use client";

import React from "react";

import Link from "next/link";
import { Button } from "./Button";
import { useAuth } from "../utilities/authContext";

export const CallToAction = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && (
        <Link
          href={"/dashboard"}
          className="mx-auto w-full max-w-[70%] md:max-w-[50%]"
        >
          <Button
            full
            dark
            className="flex items-center justify-center gap-2 p-2"
          >
            <i className="fa-solid fa-circle-arrow-right"></i>
            <span>Go to dashboard</span>
          </Button>
        </Link>
      )}
    </>
  );
};
