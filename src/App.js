// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import MovieList from './components/MovieList.js';
// // import Home from './container/home/home.tsx';
// // import About from "./container/about/about.tsx";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MovieList />} />
//         {/* <Route path="/home" element={<Home />} />
//         <Route path="/about" element={<About />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import SeatSelection from "./components/SeatSelection";
import PaymentPage from "./components/PaymentPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎬 Movie Booking
          </Typography>
          <Button color="inherit" component={Link} to="/admin">Admin</Button>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/movies">Movies</Button>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<h2 style={{ textAlign: "center", marginTop: "20px" }}>Welcome to Movie Booking!</h2>} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id/seats" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

