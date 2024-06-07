package com.example.demo.controllers;

import com.example.demo.common.APIresponse;
import com.example.demo.dto.AddItemRequest;
import com.example.demo.entity.Cart;
import com.example.demo.entity.User;
import com.example.demo.exceptions.AccessDeniedException;
import com.example.demo.exceptions.CartItemException;
import com.example.demo.services.CartService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<APIresponse> findUserCart(@RequestHeader("Authorization") String authHeader) {
        User user = userService.getUserFromJwt(authHeader);
        Cart cart = cartService.findUserCart(user.getUserId());


        APIresponse response = new APIresponse();
        response.setData(cart);
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Cart retrieved successfully");

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/add")
    public ResponseEntity<APIresponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String authHeader) {
        User user = userService.getUserFromJwt(authHeader);
        String message = cartService.addCartItem(user.getUserId(), req);

        APIresponse response = new APIresponse();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage(message);

        return ResponseEntity.status(response.getStatus()).body(response);
    }


}
