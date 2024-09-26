"use client";

import React, { useState, useEffect } from "react";

import { redirect } from "next/navigation";
import { useAuth } from "../utilities/authContext";
import { Button } from "./Button";
import { StyledLink } from "./StyledLink";
import { Input } from "./Input";

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
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 sm:px-8">
      <h1 className="text-center text-4xl font-bold text-indigo-900 sm:text-5xl md:text-6xl">
        {isForLogin ? "Log In" : "Sign up"}
      </h1>

      <h2 className="text-center text-base">
        Please provide the following information...
      </h2>

      {!isForLogin && (
        <Input
          value={name}
          type="text"
          placeholder="Name"
          changeHandler={(e) => {
            setName(e.target.value);
          }}
          className="rounded-full px-3 py-2 sm:py-3"
        />
      )}

      <Input
        value={email}
        type="email"
        placeholder="Email"
        changeHandler={(e) => {
          setEmail(e.target.value);
        }}
        className="rounded-full px-3 py-2 sm:py-3"
      />

      <Input
        value={password}
        type="password"
        placeholder="Password"
        changeHandler={(e) => {
          setPassword(e.target.value);
        }}
        className="rounded-full px-3 py-2 sm:py-3"
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

        <StyledLink href={isForLogin ? "/signup" : "/login"} isPlain={true}>
          {isForLogin ? "Sign up" : "Log in"}
        </StyledLink>
      </p>
    </div>
  );
}
