import React from "react";
import LoginOrSignup from "../components/LoginOrSignup";
import { Main } from "../components/Main";

export const metadata = {
  title: "ToGoalx ⋅ Sign up",
};

function SignupPage() {
  return (
    <Main>
      <LoginOrSignup isForLogin={false} />
    </Main>
  );
}

export default SignupPage;
