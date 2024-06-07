package com.example.demo.services;

import com.example.demo.entity.OrderItem;
import org.springframework.stereotype.Service;

@Service
public interface OrderItemService {

    public OrderItem createOrderItem(OrderItem orderItem);
}
