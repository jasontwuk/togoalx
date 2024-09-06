"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// *** Note: create auth context
const AuthContext = createContext<any>({} as any);

export function useAuth() {
  return useContext(AuthContext);
}

// *** Note: children prop type
type ContainerProps = {
  children: React.ReactNode;
};

interface UserData {
  email?: string;
  password?: string;
}

// *** Note: create auth provider
export function AuthProvider(props: ContainerProps) {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDataObj, setUserDataObj] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // *** Note: auth handlers
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj(null);
    setCurrentUser(null);
    console.log("log out");

    return signOut(auth);
  }

  useEffect(() => {
    // *** Note: setting an observer on the Auth state
    const observeOnAuthState = onAuthStateChanged(
      auth,
      async (user: User | null) => {
        try {
          setLoading(true);
          // *** Note: set the "user" to currentUser
          setCurrentUser(user);

          // *** Note: if user not exists
          if (!user) {
            console.log("No user found.");

            return;
          }

          // *** Note: if user exists, fetch data from firestore database
          const docRef = doc(db, "users", user.uid);
          // console.log("Fetching user data.");
          const docSnapshot = await getDoc(docRef);
          let firebaseData = {};

          if (docSnapshot.exists()) {
            // console.log("Found user data.");
            firebaseData = docSnapshot.data();
            // console.log({firebaseData});
          }

          setUserDataObj(firebaseData);
        } catch (error) {
          console.log(error instanceof Error ? error.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      }
    );

    return () => observeOnAuthState();
  }, []);

  const value = {
    currentUser,
    userDataObj,
    setUserDataObj,
    signup,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
