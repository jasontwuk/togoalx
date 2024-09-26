"use client";

import React from "react";
import { useAuth } from "../utilities/authContext";
import { Button } from "./Button";

function Logout() {
  const { logout } = useAuth();

  return (
    <Button
      clickHandler={logout}
      className="flex items-center justify-center gap-2 px-2 py-0.5"
    >
      <span>Log out</span>
      <i className="fa-solid fa-right-from-bracket"></i>
    </Button>
  );
}

export default Logout;
