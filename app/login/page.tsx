import React from "react";
import LoginOrSignup from "../components/LoginOrSignupx";
import { Main } from "../components/Mainx";

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
