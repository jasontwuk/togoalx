"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../utilities/authContext";
import Link from "next/link";
import { Button } from "./Button";

type LoginOrSignupProps = {
  isForLogin: boolean;
};

export default function LoginOrSignup({ isForLogin }: LoginOrSignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login, currentUser } = useAuth();

  async function handleSubmit() {
    if (!isForLogin) {
      if (!name || !email || !password || password.length < 6) {
        return;
      }
    } else {
      if (!email || !password || password.length < 6) {
        return;
      }
    }

    setAuthenticating(true);

    try {
      if (isForLogin) {
        console.log("Logging in existing user");
        await login(email, password);
      } else {
        console.log("Signing up a new user");
        await signup(name, email, password);
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setAuthenticating(false);
    }
  }

  // *** Note: when they are already logged in, redirect users back to the homepage.
  useEffect(() => {
    if (currentUser) {
      redirect("/");
    }
  }, [currentUser]);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-center text-4xl font-bold text-indigo-900 sm:text-5xl md:text-6xl">
        {isForLogin ? "Log In" : "Sign up"}
      </h1>

      <h2 className="text-center text-base">
        Please provide the following information...
      </h2>

      {!isForLogin && (
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          className="w-full rounded-full border border-solid border-gray-300 px-3 py-2 outline-none duration-200 hover:border-gray-400 focus:border-yellow-500 sm:py-3"
          placeholder="Name"
        />
      )}

      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        className="w-full rounded-full border border-solid border-gray-300 px-3 py-2 outline-none duration-200 hover:border-gray-400 focus:border-yellow-500 sm:py-3"
        placeholder="Email"
      />

      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        className="w-full rounded-full border border-solid border-gray-300 px-3 py-2 outline-none duration-200 hover:border-gray-400 focus:border-yellow-500 sm:py-3"
        placeholder="Password"
      />

      <Button
        clickHandler={handleSubmit}
        className="border-2 px-3 py-2 sm:py-3"
        full
      >
        {authenticating ? (
          "Submitting"
        ) : (
          <p className="flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-check"></i>
            <span>Submit</span>
          </p>
        )}
      </Button>

      <p className="text-center">
        {isForLogin ? "Don't have an account? " : "Already have an account? "}

        <Link
          href={isForLogin ? "/signup" : "/login"}
          className="font-bold text-indigo-600 hover:text-indigo-400"
        >
          {isForLogin ? "Sign up" : "Log in"}
        </Link>
      </p>
    </div>
  );
}
