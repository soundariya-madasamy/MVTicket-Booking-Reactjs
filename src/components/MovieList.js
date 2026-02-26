import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function MovieList() {
const [movies, setMovies] = useState([]); 

useEffect(() => { 
    axios.get("http://localhost:5000/api/movies") 
    .then(res => setMovies(res.data)) 
    .catch(err => console.error(err)); 
}, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Movie Listings</Typography>
      <Grid container spacing={2}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} key={movie.movie_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">
                  {movie.genre} | {movie.duration} | {movie.language}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/movies/${movie.movie_id}`}
                  sx={{ marginTop: "10px" }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
