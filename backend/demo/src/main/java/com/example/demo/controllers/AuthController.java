package com.example.demo.controllers;

import com.example.demo.common.APIresponse;
import com.example.demo.dto.JwtResponseDto;
import com.example.demo.dto.SignInDto;
import com.example.demo.dto.SignUpDto;
import com.example.demo.entity.Cart;
import com.example.demo.entity.User;
import com.example.demo.services.CartService;
import com.example.demo.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/user")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    CartService cartService;



    public AuthController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/signup")
    public ResponseEntity<JwtResponseDto> saveUser(@Valid @RequestBody SignUpDto userdto){
        ResponseEntity<JwtResponseDto> response = userService.saveUser(userdto);

        if (response.getStatusCode() == HttpStatus.CREATED) {

            User user = (User) response.getBody().getUser();
            System.out.println(user);
            Cart cart = cartService.createCart(user);
            System.out.println(cart);
        }
        return response;
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtResponseDto> saveUser(@Valid @RequestBody SignInDto userdto) {

       return userService.loginUser(userdto);
    }


    @GetMapping("/me")
    public ResponseEntity<APIresponse> getLoggedInUserProfile(@RequestHeader("Authorization") String authHeader){
        User user=userService.getUserFromJwt(authHeader);
        return userService.getLoggedInUserProfile(user);

    }

}
