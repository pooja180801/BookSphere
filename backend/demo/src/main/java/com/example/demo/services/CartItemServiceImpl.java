package com.example.demo.services;

import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.User;
import com.example.demo.exceptions.AccessDeniedException;
import com.example.demo.exceptions.CartItemException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repo.CartItemRepository;
import com.example.demo.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    UserService userService;

    @Autowired
    CartRepository cartRepository;


    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getBook().getBookprice() * cartItem.getQuantity());

        CartItem createdCartItem = cartItemRepository.save(cartItem);

        return createdCartItem;
    }

    @Override
    public CartItem updateCartItem(Integer userId, Integer id, CartItem cartItem) {


        CartItem item = findCartItemById(id);
        User user = userService.findUserById(userId);

        if (user.getUserId().equals(item.getUserId())) {
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(cartItem.getQuantity() * item.getBook().getBookprice());
        } else {
            throw new AccessDeniedException("User is not authorized to update this cart item");
        }

        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Book book, Integer userId) {
        CartItem cartItem=cartItemRepository.isCartItemExist(cart,book,userId);

        return cartItem;
    }

    @Override
    public String removeCartItem(Integer userId, Integer cartItemId) {

        CartItem item = findCartItemById(cartItemId);
        User user = userService.findUserById(userId);
        User reqUser=userService.findUserById(userId);

        if(user.getUserId().equals(reqUser.getUserId())){
            cartItemRepository.deleteById(cartItemId);
        }
        else{
            throw new AccessDeniedException("User is not authorized to remove this cart item");
        }

        return "Item removed from the cart";

    }

    @Override
    public CartItem findCartItemById(Integer cartItemId) {
        Optional<CartItem> opt=cartItemRepository.findById(cartItemId);

        if(opt.isPresent()){
            return opt.get();
        }
        throw new CartItemException("Cart item with ID " + cartItemId + " not found");
    }
}
