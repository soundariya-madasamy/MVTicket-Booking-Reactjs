import React from "react";
import { Typography } from "@mui/material";

export default function Dashboard() {
  const user = localStorage.getItem("token") ? localStorage.getItem("username") : "Guest";

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1">Welcome, {user}!</Typography>
      <Typography variant="body2">Here you’ll see booking history and upcoming shows.</Typography>
    </div>
  );
}
