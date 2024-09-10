import React from "react";
import LoginOrSignup from "../components/loginOrSignup";
import { Main } from "../components/main";

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
