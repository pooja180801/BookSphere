package com.example.demo.services;

import com.example.demo.dto.AddItemRequest;
import com.example.demo.entity.Cart;
import com.example.demo.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface CartService {

    public Cart createCart(User user);

    public String addCartItem(Integer userId, AddItemRequest req);

    public Cart findUserCart(Integer userId);

    void clearCart(Integer userId);
}
