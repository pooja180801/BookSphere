package com.example.demo.controllers;

import com.example.demo.common.APIresponse;
import com.example.demo.entity.DeliveryForm;
import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.services.OrderService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    UserService userService;

    @Autowired
    OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<APIresponse> createOrder(@RequestBody DeliveryForm deliveryForm, @RequestHeader("Authorization") String authHeader){
        User user=userService.getUserFromJwt(authHeader);

        Order order=orderService.createOrder(user,deliveryForm);
        APIresponse response=new APIresponse();
        response.setData(order);
        response.setStatus(HttpStatus.OK.value());

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIresponse> findOrderById(@RequestHeader("Authorization") String authHeader,@PathVariable("id") Integer id){
        User user=userService.getUserFromJwt(authHeader);

        Order order=orderService.findOrderById(id);

        APIresponse response=new APIresponse();
        response.setStatus(HttpStatus.OK.value());
        response.setData(order);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping("/confirm/{orderId}")
    public ResponseEntity<Order> confirmOrder(
            @PathVariable("orderId") Integer orderId,
            @RequestHeader("Authorization") String authHeader){
        User user=userService.getUserFromJwt(authHeader);

        Order confirmedOrder = orderService.confirmedOrder(orderId, user.getUserId());
        return ResponseEntity.ok(confirmedOrder);
    }


}
