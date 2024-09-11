"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { kalam } from "../utilities/fonts";
import { useAuth } from "../utilities/authContext";
import Logout from "./Logout";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

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
    <div className="flex justify-between items-center p-4 sm:p-8 gap-4">
      <Link
        href={"/"}
        className={clsx(kalam.className, "text-2xl font-bold text-indigo-500")}
      >
        ToGoalx
      </Link>

      {currentUser && username ? (
        <div className="flex justify-center items-center gap-2">
          <span>
            Hi <em className="not-italic font-bold">{username}</em>
          </span>
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
