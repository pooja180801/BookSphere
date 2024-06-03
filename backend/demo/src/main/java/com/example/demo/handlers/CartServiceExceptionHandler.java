package com.example.demo.handlers;

import com.example.demo.common.APIresponse;
import com.example.demo.exceptions.CartItemException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CartServiceExceptionHandler {
    @ExceptionHandler(CartItemException.class)
    public ResponseEntity<APIresponse> handleOrderException(CartItemException e) {
        APIresponse response = new APIresponse();
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setError(e.getMessage());
        response.setData(null);

        return ResponseEntity.status(response.getStatus()).body(response);

    }
}
