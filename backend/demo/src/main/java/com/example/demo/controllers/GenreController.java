package com.example.demo.controllers;

import com.example.demo.entity.Genre;
import com.example.demo.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/genre")
public class GenreController {


    @Autowired
    private GenreService genreService;

    @GetMapping("/viewGenre")
    public List<Genre> viewAllGenre(){
        return genreService.viewAll();

    }

    @PostMapping("/addGenre")
    public Genre addGenre(@RequestBody Genre genre){
        return genreService.addGenre(genre);
    }

}
