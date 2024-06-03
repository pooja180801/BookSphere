package com.example.demo.handlers;

import com.example.demo.common.APIresponse;
import com.example.demo.exceptions.AccessDeniedException;
import com.example.demo.exceptions.UserAlreadyExistsException;
import com.example.demo.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.FieldError; // Correct import for FieldError


import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class UserServiceGlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<APIresponse> handleUserAlreadyExistsException(UserAlreadyExistsException e){
        APIresponse response=new APIresponse();

        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setError(e.getMessage());
        response.setData(null);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<APIresponse> handleUserNotFoundException(UserNotFoundException e){
        APIresponse response=new APIresponse();

        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setError(e.getMessage());
        response.setData(null);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<APIresponse> handleAccessDeniedException(AccessDeniedException e){
        APIresponse response=new APIresponse();

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setError(e.getMessage());
        response.setData(null);

        return ResponseEntity.status(response.getStatus()).body(response);
    }









}
