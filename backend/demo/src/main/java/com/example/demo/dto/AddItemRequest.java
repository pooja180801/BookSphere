package com.example.demo.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AddItemRequest {
    private Integer bookId;
    private int quantity;
    private double price;

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
