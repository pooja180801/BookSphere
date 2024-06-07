package com.example.demo.handlers;

import com.example.demo.common.APIresponse;
import com.example.demo.exceptions.GenreNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@ControllerAdvice
public class GenreServiceGlobalExceptionHandler {

    @ExceptionHandler(GenreNotFoundException.class)
    public ResponseEntity<APIresponse> handleGenreServiceGlobalExceptionHandler(GenreNotFoundException e){

        APIresponse response=new APIresponse();
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setError(e.getMessage());
        response.setData(null);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

}
