package com.example.demo.services;

import com.example.demo.entity.DeliveryForm;
import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    public Order createOrder(User user, DeliveryForm deliveryForm);

    public Order findOrderById(Integer orderId);

    public Order placedOrder(Integer orderId);
    public Order confirmedOrder(Integer orderId);





}
