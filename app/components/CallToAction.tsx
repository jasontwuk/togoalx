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
          className="w-full mx-auto max-w-[70%] md:max-w-[50%]"
        >
          <Button full dark className="p-2">
            Go to dashboard
          </Button>
        </Link>
      )}
    </>
  );
};
