import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null); 
    const [showTimes, setShowTimes] = useState(null); 
    useEffect(() => { 
        axios.get(`http://localhost:5000/api/movies/${id}`) 
        .then(res => {
            setMovie(res.data.movie);
            setShowTimes(res.data.showtimes);
        }) 
        .catch(err => console.error(err)); 
    }, [id]);

    if (!movie) return <h2>Loading...</h2>;

    return (
        <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>{movie.title}</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Card>
                <CardContent>
                <Typography variant="body1">
                    <strong>Genre:</strong> {movie.genre}
                </Typography>
                <Typography variant="body1">
                    <strong>Duration:</strong> {movie.duration}
                </Typography>
                <Typography variant="body1">
                    <strong>Language:</strong> {movie.language}
                </Typography>
                <Typography variant="body1">
                    <strong>Cast:</strong> {movie.cast || "Cast info coming soon"}
                </Typography>
                <h3>Showtimes</h3>
                <ul>
                    {showTimes.map(show => (
                    <><li key={show.show_id}>
                            {show.theater_name} - {show.screen_name} | {new Date(show.start_time).toLocaleString()} | ₹{show.price}
                        </li><Button variant="contained" color="secondary" component={Link}
                            to={`/movies/${show.show_id}/seats`} sx={{ marginTop: "10px" }}>
                                Select Seats
                            </Button></>
                    ))}
                </ul>
               
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={12} md={6}>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                src="https://www.youtube.com/embed/YoHD9XEInc0" // mock trailer link
                title="Movie Trailer"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
            
            </Grid>
           
        </Grid>
        </div>
    );
}
