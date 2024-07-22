package com.jewelry_store.jewelry_store.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderSumary {
      @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long areaId;

    private String orderStatus;

    private double totalAmount;

    private long totalOrlder;

    private Long totalItems;
}
