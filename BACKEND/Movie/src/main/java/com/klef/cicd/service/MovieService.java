package com.klef.cicd.service;

import java.util.List;
import com.klef.cicd.entity.Movie;

public interface MovieService {
    Movie addMovie(Movie movie);
    List<Movie> getAllMovies();
    Movie getMovieById(int id);
    Movie updateMovie(Movie movie);
    void deleteMovieById(int id);
}
