import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", { username, password });
      alert("Registered successfully!");
      navigate("/login");
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">Register</Typography>
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
    </div>
  );
}
