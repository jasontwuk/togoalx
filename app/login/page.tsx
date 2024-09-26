import React from "react";
import LoginOrSignup from "../components/LoginOrSignup";
import { Main } from "../components/Main";

export const metadata = {
  title: "ToGoalx ⋅ Log in",
};

function LoginPage() {
  return (
    <Main>
      <LoginOrSignup isForLogin={true} />
    </Main>
  );
}

export default LoginPage;
