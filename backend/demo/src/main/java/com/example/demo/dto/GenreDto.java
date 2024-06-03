package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class GenreDto {
    private Integer genreid;

    @NotBlank(message = "genre name cannot ne empty")
    private String genrename;

    public Integer getGenreid() {
        return genreid;
    }

    public void setGenreid(Integer genreid) {
        this.genreid = genreid;
    }

    public String getGenrename() {
        return genrename;
    }

    public void setGenrename(String genrename) {
        this.genrename = genrename;
    }
}
