package com.example.demo.exceptions;

public class GenreNotFoundException extends RuntimeException{
    public GenreNotFoundException(String msg){
        super(msg);
    }

}
