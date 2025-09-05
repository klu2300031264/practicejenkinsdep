import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({
    id: '',
    name: '',
    director: '',
    year: '',
    rating: '',
    language: '',
    duration: '',
    description: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedMovie, setFetchedMovie] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/movieapi`;

  useEffect(() => {
    fetchAllMovies();
  }, []);

  // ✅ Fetch all movies
  const fetchAllMovies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setMovies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
    } catch (error) {
      console.error("Fetch movies error:", error.response?.data || error.message);
      setMessage("Failed to fetch movies.");
      setMovies([]);
    }
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // ✅ Validate form
  const validateForm = () => {
    for (let key in movie) {
      if (!movie[key] || movie[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  // ✅ Add movie
  const addMovie = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, movie, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage('Movie added successfully.');
      fetchAllMovies();
      resetForm();
    } catch (error) {
      console.error("Add movie error:", error.response?.data || error.message);
      setMessage('Error adding movie.');
    }
  };

  // ✅ Update movie
  const updateMovie = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, movie, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage('Movie updated successfully.');
      fetchAllMovies();
      resetForm();
    } catch (error) {
      console.error("Update movie error:", error.response?.data || error.message);
      setMessage('Error updating movie.');
    }
  };

  // ✅ Delete movie
  const deleteMovie = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllMovies();
    } catch (error) {
      console.error("Delete movie error:", error.response?.data || error.message);
      setMessage('Error deleting movie.');
    }
  };

  // ✅ Get movie by ID
  const getMovieById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedMovie(res.data);
      setMessage('');
    } catch (error) {
      console.error("Get movie error:", error.response?.data || error.message);
      setFetchedMovie(null);
      setMessage('Movie not found.');
    }
  };

  // ✅ Edit movie
  const handleEdit = (mov) => {
    setMovie(mov);
    setEditMode(true);
    setMessage(`Editing movie with ID ${mov.id}`);
  };

  // ✅ Reset form
  const resetForm = () => {
    setMovie({
      id: '',
      name: '',
      director: '',
      year: '',
      rating: '',
      language: '',
      duration: '',
      description: ''
    });
    setEditMode(false);
  };

  return (
    <div className="movie-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Movie Management</h2>

      {/* Add/Edit Form */}
      <div>
        <h3>{editMode ? 'Edit Movie' : 'Add Movie'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={movie.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={movie.name} onChange={handleChange} />
          <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
          <input type="number" name="year" placeholder="Year" value={movie.year} onChange={handleChange} />
          <input type="text" name="rating" placeholder="Rating" value={movie.rating} onChange={handleChange} />
          <input type="text" name="language" placeholder="Language" value={movie.language} onChange={handleChange} />
          <input type="text" name="duration" placeholder="Duration" value={movie.duration} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={movie.description} onChange={handleChange}></textarea>
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addMovie}>Add Movie</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateMovie}>Update Movie</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Get Movie by ID */}
      <div>
        <h3>Get Movie By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getMovieById}>Fetch</button>

        {fetchedMovie && (
          <div>
            <h4>Movie Found:</h4>
            <pre>{JSON.stringify(fetchedMovie, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All Movies */}
      <div>
        <h3>All Movies</h3>
        {Array.isArray(movies) && movies.length > 0 ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(movie).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((mov) => (
                  <tr key={mov.id}>
                    {Object.keys(movie).map((key) => (
                      <td key={key}>{mov[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(mov)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteMovie(mov.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieManager;
