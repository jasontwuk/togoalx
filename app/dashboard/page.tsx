import React from "react";

import { Main } from "../components/Main";
import { Dashboard } from "../components/Dashboard";

export const metadata = {
  title: "ToGoalx ⋅ Dashboard",
};

function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}

export default DashboardPage;
