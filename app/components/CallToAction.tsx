"use client";

import React from "react";

import { Button } from "./Buttonx";
import { useAuth } from "../utilities/authContext";

export const CallToAction = () => {
  const { currentUser } = useAuth();

  return (
    <div className="px-4 sm:px-8">
      {currentUser ? (
        <Button
          full
          dark
          className="mx-auto flex w-full items-center justify-center gap-2 p-2 sm:max-w-[70%] md:max-w-[50%]"
          // *** Note: use Button as an Link
          clickHandler={() => (window.location.href = "/dashboard")}
        >
          <i className="fa-solid fa-circle-arrow-right"></i>
          <span>Go to dashboard</span>
        </Button>
      ) : (
        <Button
          full
          dark
          className="mx-auto flex w-full flex-wrap items-center justify-center gap-2 p-2 hover:opacity-100 sm:max-w-[70%] md:max-w-[50%]"
          // *** Note: use button as an Link
          clickHandler={() => (window.location.href = "/dashboard")}
          disabled
        >
          <span className="flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-arrow-right"></i>
            <em className="not-italic">Go to dashboard</em>
          </span>

          {!currentUser && (
            <span className="text-xs">(Log in to get access)</span>
          )}
        </Button>
      )}
    </div>
  );
};
