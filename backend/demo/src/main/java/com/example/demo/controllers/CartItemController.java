package com.example.demo.controllers;

import com.example.demo.common.APIresponse;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.User;
import com.example.demo.services.CartItemService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cartItem")
public class CartItemController {
    @Autowired
    CartItemService cartItemService;

    @Autowired
    UserService userService;
    @PutMapping("/update/{id}")
    public ResponseEntity<APIresponse> updateCartItem(@RequestHeader("Authorization") String authHeader,
                                                 @PathVariable Integer id,
                                                 @RequestBody CartItem cartItem) {
        APIresponse res=new APIresponse();

        User user=userService.getUserFromJwt(authHeader);
        CartItem cartItem1=cartItemService.updateCartItem(user.getUserId(), id,cartItem);

        res.setData(cartItem1);
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Item Updated successfully");

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @DeleteMapping("/delete/{cartItemId}")
    public ResponseEntity<APIresponse> removeCartItem(@RequestHeader("Authorization") String authHeader,
                                                      @PathVariable Integer cartItemId) {

        APIresponse res=new APIresponse();

        User user=userService.getUserFromJwt(authHeader);
        String msg=cartItemService.removeCartItem(user.getUserId(), cartItemId);

        res.setData(msg);
        res.setStatus(HttpStatus.OK.value());

        return ResponseEntity.status(res.getStatus()).body(res);

    }
}
