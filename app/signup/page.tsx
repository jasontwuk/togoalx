import React from "react";
import LoginOrSignup from "../components/loginOrSignup";
import { Main } from "../components/main";

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
