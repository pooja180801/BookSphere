package com.example.demo.services;

import com.example.demo.entity.Genre;
import com.example.demo.repo.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService {

    private GenreRepository genreRepository;

    @Override
    public Genre addGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    @Override
    public List<Genre> viewAll() {
        List<Genre> genres= genreRepository.findAll();
        return genres;
    }
}
