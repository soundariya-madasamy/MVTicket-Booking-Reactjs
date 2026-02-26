import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import IconButton from "@mui/material/IconButton";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    duration: "",
    language: "",
    cast: "",
    trailer_url: "",
    release_date: ""
  });
  const [isEnableEdit, setEnableEdit] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // axios.get("http://localhost:5000/api/admin/users", {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).then(res => setUsers(res.data));

    getMovieList();

  }, [token]);

  const getMovieList = () => {
    axios.get("http://localhost:5000/api/movies", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMovies(res.data));
  }

  const addMovie1 = async () => {
    const res = await axios.post("http://localhost:5000/api/movies", newMovie, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMovies([...movies, res.data]);
    setNewMovie({ title: "", genre: "", duration: "", language: "" });
  };

  const addMovie = async () => {
    try {
      await axios.post("http://localhost:5000/api/movies", newMovie);
      alert("Movie added successfully!");

      resetMovieForm();
      getMovieList();
    } catch (err) {
      alert("Error adding movie: " + err.message);
    }
  };

  const handleEdit = (movie) => {
    setNewMovie(movie); 
    setEnableEdit(true);
  };

  const updateMovie = async () => {
      try {
        const formattedDate =  newMovie.release_date.includes("T") ? newMovie.release_date.split("T")[0] : newMovie.release_date;
        setNewMovie({...newMovie, release_date: formattedDate});
        console.log(newMovie)
        await axios.put(`http://localhost:5000/api/movies/${newMovie.movie_id}`, newMovie);
        alert("Movie updated successfully!");
        resetMovieForm(); 
        getMovieList();
      } catch (err) {
        alert("Error updating movie: " + err.message);
      }
    };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axios.delete(`http://localhost:5000/api/movies/${id}`);
        alert("Movie deleted successfully!");
        getMovieList();
      } catch (err) {
        alert("Error deleting movie: " + err.message);
      }
    }
  };

  const resetMovieForm = () =>{
    setNewMovie({ 
      title: "", genre: "", duration: "", language: "", cast: "", trailer_url: "", release_date: "" 
    });
    setEnableEdit(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      {/* Users Table */}
      <div style={{ display: 'none' }}>
        <Typography variant="h5" sx={{ marginTop: "20px" }}>Users</Typography>
        <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>Password</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u, i) => (
                <TableRow key={i}>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Movies Table */}
      <Typography variant="h5" sx={{ marginTop: "30px" }}>Movies</Typography>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Genre</strong></TableCell>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell><strong>Language</strong></TableCell>
              <TableCell><strong>Cast</strong></TableCell>
              <TableCell><strong>Trailer</strong></TableCell>
              <TableCell><strong>Release Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map(movie => (
              <TableRow key={movie.movie_id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.duration} min</TableCell>
                <TableCell>{movie.language}</TableCell>
                <TableCell>{movie.cast}</TableCell>
                <TableCell>
                  <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
                    Watch Trailer
                  </a>
                </TableCell>
                <TableCell>{new Date(movie.release_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(movie)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(movie.movie_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {/* Add Movie Form */}
      <Typography variant="h6" sx={{ marginTop: "30px" }}>Add New Movie</Typography>
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Title" fullWidth value={newMovie.title} 
            onChange={e => setNewMovie({ ...newMovie, title: e.target.value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Genre" fullWidth value={newMovie.genre} 
            onChange={e => setNewMovie({ ...newMovie, genre: e.target.value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Duration (minutes)" fullWidth value={newMovie.duration} 
            onChange={e => setNewMovie({ ...newMovie, duration: e.target.value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Language" fullWidth value={newMovie.language} 
            onChange={e => setNewMovie({ ...newMovie, language: e.target.value })} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Cast" fullWidth value={newMovie.cast} 
            onChange={e => setNewMovie({ ...newMovie, cast: e.target.value })} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Trailer URL" fullWidth value={newMovie.trailer_url} 
            onChange={e => setNewMovie({ ...newMovie, trailer_url: e.target.value })} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Release Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newMovie.release_date ? newMovie.release_date.split("T")[0] : ""}
            onChange={e => setNewMovie({ ...newMovie, release_date: e.target.value })}
          />
        </Grid>
      </Grid>
      { !isEnableEdit ?
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={addMovie}>
          Add Movie
        </Button> 
        : 
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={updateMovie}>
          Update Movie
        </Button>  
      }
    </div>
  );
}
