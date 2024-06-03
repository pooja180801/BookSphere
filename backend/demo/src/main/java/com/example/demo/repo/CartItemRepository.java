package com.example.demo.repo;

import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Integer> {

    @Query("select cartItem from CartItem cartItem where cartItem.cart=:cart and cartItem.book=:book and cartItem.userId=:userId")
    public CartItem isCartItemExist(@Param("cart") Cart cart, @Param("book")Book book,@Param("userId")Integer userId);
}
