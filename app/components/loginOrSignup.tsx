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

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  login?: string;
}

interface Touched {
  name: boolean;
  email: boolean;
  password: boolean;
}

export default function LoginOrSignup({ isForLogin }: LoginOrSignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  // *** Note: track if the user has touched the inputs
  const [touched, setTouched] = useState<Touched>({
    name: false,
    email: false,
    password: false,
  });
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

      // *** Note: set up log in error message
      if (isForLogin) {
        const newErrors: Errors = {};

        newErrors.login = "Your email or password is incorrect.";
        setErrors(newErrors);
      }
    } finally {
      setAuthenticating(false);
    }
  }

  // *** Note: form validation
  useEffect(() => {
    const validateForm = () => {
      const newErrors: Errors = {};

      if (!isForLogin && !name) {
        newErrors.name = "Name is required.";
      }

      if (!email) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid.";
      }

      if (!password) {
        newErrors.password = "Password is required.";
      } else if (password.length < 6) {
        newErrors.password =
          "Password must be at least 6 characters or numbers.";
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [isForLogin, name, email, password]);

  // *** Note: handlers to mark inputs as touched
  const handleBlur = (field: keyof Touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

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
        <div className="flex w-full flex-col items-center justify-center gap-1">
          <Input
            value={name}
            type="text"
            placeholder="Name"
            changeHandler={(e) => {
              setName(e.target.value);
            }}
            onBlur={() => handleBlur("name")}
            className="rounded-full px-3 py-2 sm:py-3"
          />

          {touched.name && errors.name && (
            <p className="px-3 text-center text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>
      )}

      <div className="flex w-full flex-col items-center justify-center gap-1">
        <Input
          value={email}
          type="email"
          placeholder="Email"
          onBlur={() => handleBlur("email")}
          changeHandler={(e) => {
            setEmail(e.target.value);
          }}
          className="rounded-full px-3 py-2 sm:py-3"
        />

        {touched.email && errors.email && (
          <p className="px-3 text-center text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-1">
        <Input
          value={password}
          type="password"
          placeholder="Password"
          onBlur={() => handleBlur("password")}
          changeHandler={(e) => {
            setPassword(e.target.value);
          }}
          className="rounded-full px-3 py-2 sm:py-3"
        />

        {touched.password && errors.password && (
          <p className="px-3 text-center text-xs text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-1">
        <Button
          clickHandler={handleSubmit}
          className="border-2 px-3 py-2 sm:py-3"
          full
          disabled={!isFormValid}
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

        {errors.login && (
          <p className="px-3 text-center text-xs text-red-500">
            {errors.login}
          </p>
        )}
      </div>

      <p className="text-center">
        {isForLogin ? "Don't have an account? " : "Already have an account? "}

        <StyledLink href={isForLogin ? "/signup" : "/login"} isPlain={true}>
          {isForLogin ? "Sign up" : "Log in"}
        </StyledLink>
      </p>
    </div>
  );
}
