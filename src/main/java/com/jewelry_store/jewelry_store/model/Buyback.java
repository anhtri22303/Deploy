package com.jewelry_store.jewelry_store.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Buyback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User staff;

    @JsonIgnore
    @ManyToOne
    private Area area ;

    @ManyToOne
    private Jewelry jewelry;

    private double buybackPrice;

    private Date transactionDate;

    @ManyToOne
    private Customer customer;

}

