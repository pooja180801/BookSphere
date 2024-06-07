package com.example.demo.services;

import com.example.demo.dto.AddItemRequest;
import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.User;
import com.example.demo.exceptions.CartItemException;
import com.example.demo.repo.CartItemRepository;
import com.example.demo.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
public class CartServiceImpl implements CartService{

    @Autowired
    CartRepository cartRepository;
    @Autowired
    CartItemService cartItemService;
    @Autowired
    BookService bookService;
    @Autowired
    CartItemRepository cartItemRepository;



    @Override
    public Cart createCart(User user) {
        Cart cart=new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Integer userId, AddItemRequest req) {
        Cart cart=cartRepository.findByUserUserId(userId);
        Book book=bookService.viewById(req.getBookId());

        CartItem isExist=cartItemService.isCartItemExist(cart,book,userId);

        if(isExist==null){
            CartItem cartItem=new CartItem();
            cartItem.setBook(book);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setCart(cart);
            cartItem.setUserId(userId);

            double price=req.getQuantity()*req.getPrice();
            cartItem.setPrice(price);

            CartItem createdCartItem=cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);

        }
        return "Item added successfully";
    }

    @Override
    public Cart findUserCart(Integer userId) {
        Cart cart = cartRepository.findByUserUserId(userId);


            double totalPrice = 0;
            int totalItems = 0;

            for (CartItem cartItem : cart.getCartItems()) {
                totalPrice += cartItem.getPrice();
                totalItems += cartItem.getQuantity();
            }

            cart.setTotalPrice(totalPrice);
            cart.setTotalItem(totalItems);

            return cartRepository.save(cart);

    }


    public void clearCart(Integer userId) {
        Cart cart = cartRepository.findByUserUserId(userId);
        if (cart != null) {
            Set<CartItem> cartItems = cart.getCartItems();

            cartItemRepository.deleteAll(cartItems);
            cart.getCartItems().clear();
            cart.setTotalPrice(0);
            cart.setTotalItem(0);
            cartRepository.save(cart);
        } else {
            throw new CartItemException("No cart found for user with ID " + userId);
        }
    }
}
