package com.jewelry_store.jewelry_store.model;

import java.util.Date;
import java.util.List;



import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orderr {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User staff;

    @JsonIgnore
    @ManyToOne
    private Area area ;

    private double totalAmount;

    private String orderStatus;

    private Date createdAt;

    @OneToMany
    private List<OrderItem> items;
    
    // private Payment payment

    private int totalItem;

    private double totalPrice;

    @ManyToOne
    private Customer customer;  // Added this line to establish the relationship with Customer


}
