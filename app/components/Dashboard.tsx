"use client";

import React, { useEffect } from "react";

import { redirect } from "next/navigation";
import { useAuth } from "../utilities/authContext";
import { Calendar } from "./Calendarx";

export const Dashboard = () => {
  const { currentUser, loading } = useAuth();

  if (!loading && !currentUser) {
    redirect("/");
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-indigo-900 sm:text-5xl md:text-6xl">
        Dashboard
      </h1>

      <Calendar />
    </>
  );
};
