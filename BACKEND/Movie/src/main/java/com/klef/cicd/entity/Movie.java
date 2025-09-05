package com.klef.cicd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movie_table")
public class Movie {

    @Id
    @Column(name = "movie_id")
    private int id;

    @Column(name = "movie_name", nullable = false, length = 100)
    private String name;

    @Column(name = "movie_director", nullable = false, length = 50)
    private String director;

    @Column(name = "movie_year", nullable = false)
    private int year;

    @Column(name = "movie_rating", nullable = false)
    private double rating;

    @Column(name = "movie_language", nullable = false, length = 20)
    private String language;

    @Column(name = "movie_duration", nullable = false, length = 10)
    private String duration;

    @Column(name = "movie_description", columnDefinition = "TEXT")
    private String description;

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDirector() {
        return director;
    }
    public void setDirector(String director) {
        this.director = director;
    }

    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }

    public double getRating() {
        return rating;
    }
    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getLanguage() {
        return language;
    }
    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDuration() {
        return duration;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Movie [id=" + id + ", name=" + name + ", director=" + director +
               ", year=" + year + ", rating=" + rating + ", language=" + language +
               ", duration=" + duration + ", description=" + description + "]";
    }
}
