"use client";

import React from "react";
import { useAuth } from "../utilities/authContext";
import { Button } from "./Button";

function Logout() {
  const { logout } = useAuth();

  return (
    <Button clickHandler={logout} className="py-0.5 px-2">
      Log out
    </Button>
  );
}

export default Logout;
