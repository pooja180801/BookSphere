package com.example.demo.services;

import com.example.demo.entity.Genre;

import java.util.List;

public interface GenreService {
    public Genre addGenre(Genre genre);

    public List<Genre> viewAll();
}
