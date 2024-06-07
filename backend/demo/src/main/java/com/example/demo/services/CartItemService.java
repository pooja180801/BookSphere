package com.example.demo.services;

import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;

public interface CartItemService {

    public CartItem createCartItem(CartItem cartItem);
    public CartItem updateCartItem(Integer userId,Integer cartId,CartItem cartItem);

    public CartItem isCartItemExist(Cart cart, Book book, Integer userId);
    public String removeCartItem(Integer userId,Integer cartItemId);
    public CartItem findCartItemById(Integer cartItemId);

}
