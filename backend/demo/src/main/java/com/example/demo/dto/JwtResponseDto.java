package com.example.demo.dto;

import com.example.demo.entity.Book;
import com.example.demo.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)

public class JwtResponseDto {
    private int status;
    private String error;
    private String message;
    private String token;
    private String expirationTime;
   private User user;


}
