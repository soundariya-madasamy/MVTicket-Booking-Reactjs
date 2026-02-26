import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function SeatSelection() {
  const { id } = useParams(); // movieId from route
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/seats/${id}`)
      .then(res => setSeats(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const toggleSeat = (seatId) => {
    setSelected(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const onConfirm = async (selected) => {
    console.log(selected)
    await axios.post(`http://localhost:5000/api/seats/${id}/book`, { selectedSeats: selected });
    localStorage.setItem("selectedSeats", JSON.stringify(selected));
    navigate("/payment");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">Select Seats</Typography>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 50px)", gap: "10px", marginTop: "20px" }}>
        {seats.map(seat => (
          <Button
            key={seat.seat_id}
            variant="contained"
            disabled={seat.status === "booked"}
            style={{ margin: "5px", backgroundColor: selected.includes(seat.seat_id) ? "green" : "lightgray" }} 
            onClick={() => toggleSeat(seat.seat_id)}
          >
            {seat.seat_number}
          </Button>
        ))}
      </div>
      <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={onConfirm(selected)}>
        Confirm Seats
      </Button>
    </div>
  );
}
