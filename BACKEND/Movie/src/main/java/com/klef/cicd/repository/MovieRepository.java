package com.klef.cicd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.cicd.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> 
{
    // Custom queries if needed
    Movie findByName(String name);
    Movie findByDirector(String director);
    
    
}
