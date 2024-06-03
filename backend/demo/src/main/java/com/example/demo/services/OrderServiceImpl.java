package com.example.demo.services;

import com.example.demo.entity.*;
import com.example.demo.exceptions.OrderException;
import com.example.demo.repo.DeliveryFormRepository;
import com.example.demo.repo.OrderItemRepository;
import com.example.demo.repo.OrderRepository;
import com.example.demo.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService{

   @Autowired
    OrderRepository orderRepository;

   @Autowired
   CartService cartService;

   @Autowired
    UserRepository userRepository;

   @Autowired
    DeliveryFormRepository deliveryFormRepository;

   @Autowired
    OrderItemRepository orderItemRepository;

    @Override
    public Order createOrder(User user, DeliveryForm deliveryForm) {

        deliveryForm.setUser(user);
        DeliveryForm deliveryForm1=deliveryFormRepository.save(deliveryForm);
        user.getDeliveryForm().add(deliveryForm1);
        userRepository.save(user);

        Cart cart=cartService.findUserCart(user.getUserId());
        List<OrderItem> orderItems=new ArrayList<>();

        for (CartItem item:
        cart.getCartItems()){
            OrderItem orderItem=new OrderItem();

            orderItem.setPrice(item.getPrice());
            orderItem.setBooks(item.getBook());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUserId(item.getUserId());

            OrderItem createdOrderItem=orderItemRepository.save(orderItem);

            orderItems.add(orderItem);
        }

        Order createdOrder=new Order();
        createdOrder.setUser(user);
        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalItems(cart.getTotalItem());
        createdOrder.setDeliveryForm(deliveryForm);
        createdOrder.setOrderStatus("pending");
        createdOrder.setPlacedOn(LocalDateTime.now());
        createdOrder.setPaymentStatus("pending");

        Order savedOrder=orderRepository.save(createdOrder);

        for (OrderItem item:
             orderItems) {
            item.setOrder(savedOrder);
            orderItemRepository.save(item);

        }

        return savedOrder;

    }

    public Order findOrderById(Integer orderId) {
        Order optionalOrder = orderRepository.findById(orderId).orElseThrow(()->new OrderException("no such order found"));
        return optionalOrder;
    }

    @Override
    public Order placedOrder(Integer orderId) {
        Order order=findOrderById(orderId);
        order.setOrderStatus("Placed");

        return orderRepository.save(order);
    }

    @Override
    public Order confirmedOrder(Integer orderId) {
        Order order=findOrderById(orderId);
        order.setOrderStatus("confirmed");

        return orderRepository.save(order);
    }


}
