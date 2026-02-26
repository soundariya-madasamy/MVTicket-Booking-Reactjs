import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    // Mock payment success
    alert("Payment successful!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">Payment</Typography>
      <TextField label="Card Number" fullWidth margin="normal" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
      <TextField label="Coupon Code" fullWidth margin="normal" value={coupon} onChange={e => setCoupon(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handlePayment}>Pay Now</Button>
    </div>
  );
}
