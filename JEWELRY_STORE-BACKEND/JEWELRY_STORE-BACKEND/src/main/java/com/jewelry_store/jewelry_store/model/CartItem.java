package com.jewelry_store.jewelry_store.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CartItem {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    private Jewelry jewelry;

    private int quantity;

    private List<String> components;

    private double totalPrice;

    private double discountedPrice; // Trường mới để lưu giá đã giảm

    public double getTotalPrice() {
        return this.totalPrice;
    }

    public void setDiscountedPrice(double discountPercentage) {
        this.discountedPrice = this.totalPrice - (this.totalPrice * discountPercentage / 100);
    }

    public double getDiscountedPrice() {
        return this.discountedPrice;
    }
}

