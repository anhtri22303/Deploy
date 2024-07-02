package com.jewelry_store.jewelry_store.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnoreProperties("area") // Loại bỏ thuộc tính area trong User để ngăn không bị lặp lại
    @OneToOne
    @JoinColumn(name = "staff_id", referencedColumnName = "id")
    private User staff;
     

    private String name;

    private String description;

    @Embedded
    private ContactInformation contactInformation;

    private String openingHours;

     
    @JsonManagedReference
    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orderr> orders = new ArrayList<>();
    
    @ElementCollection
    @Column(length = 1000)
    private List<String> images;

    private boolean open;
}