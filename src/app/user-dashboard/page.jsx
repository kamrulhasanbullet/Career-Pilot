import DashboardStatus from "@/components/DashboardStatus";
import React from "react";

export const metadata = {
  title: "User Dashboard",
};

export default function UserDashboardPage() {
  return (
    <div>
      <DashboardStatus />
    </div>
  );
}
