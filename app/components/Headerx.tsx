"use client";

import React, { useState } from "react";

import { useAuth } from "../utilities/authContext";
import Logout from "./Logoutx";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { StyledLink } from "./StyledLink";

export const Header = () => {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");

  if (currentUser) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // *** Note: user is signed in
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
        } else {
          console.log("No such document!");
        }
      } else {
        // *** Note: user is signed out
        console.log("User is not signed in");
      }
    });
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4 sm:p-8">
      <StyledLink href="/" isKalam={true} isPlain={true} className="text-2xl">
        ToGoalx
      </StyledLink>

      {currentUser && username ? (
        <div className="flex items-center justify-center gap-2">
          <span>
            Hi <em className="font-bold not-italic">{username}</em>
          </span>
          <Logout />
        </div>
      ) : (
        <StyledLink href="/login" isBorder={true}>
          <i className="fa-solid fa-right-to-bracket"></i>
          <span>log in</span>
        </StyledLink>
      )}
    </div>
  );
};
