import React from "react";
import LoginOrSignup from "../components/LoginOrSignupx";
import { Main } from "../components/Mainx";

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
