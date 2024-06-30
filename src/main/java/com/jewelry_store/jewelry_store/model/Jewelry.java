package com.jewelry_store.jewelry_store.model;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Jewelry {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String description;

    private double goldWeight;

    private double diamondWeight;

    @ManyToOne
    private Category jewelryCategory;
   
    
    @JsonIgnoreProperties("jewelryList") // Ngăn Jackson serialize thuộc tính jewelryList của Component
    @ManyToMany
    @JoinTable(
        name = "jewelry_component",
        joinColumns = @JoinColumn(name = "jewelry_id"),
        inverseJoinColumns = @JoinColumn(name = "component_id")
    )
    private List<Component> components = new ArrayList<>();

    private String code ;

    @Column(length = 1000)
    @ElementCollection
    private List<String> images;

    private boolean availabe;


    private Date creationDate;

    private double price;

    @OneToMany(mappedBy = "jewelry")
    private List<BuybackTransaction> buybackTransactions;
    
}
