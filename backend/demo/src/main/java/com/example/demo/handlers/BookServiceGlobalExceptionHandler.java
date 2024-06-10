package com.example.demo.handlers;

import com.example.demo.common.APIresponse;
import com.example.demo.exceptions.BookNotFoundException;
import com.example.demo.exceptions.IllegalArgumentException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class BookServiceGlobalExceptionHandler {

  @ExceptionHandler(BookNotFoundException.class)
  public ResponseEntity<APIresponse>  handleBookNotFoundException(BookNotFoundException e){

    
      APIresponse response=new APIresponse();
      response.setStatus(HttpStatus.NOT_FOUND.value());
      response.setError(e.getMessage());
      response.setData(null);

      return ResponseEntity.status(response.getStatus()).body(response);

  }

  @ExceptionHandler(IllegalArgumentException.class)
      public ResponseEntity<APIresponse> handleIllegalArgumentException(IllegalArgumentException e){

          APIresponse response=new APIresponse();
          response.setStatus(HttpStatus.BAD_REQUEST.value());
          response.setError(e.getMessage());
      response.setData(null);

          return ResponseEntity.status(response.getStatus()).body(response);


  }


}
