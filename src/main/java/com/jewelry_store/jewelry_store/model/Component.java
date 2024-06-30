package com.jewelry_store.jewelry_store.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Component {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    private double price;

    private double pricebuyback;

    @JsonIgnoreProperties("components") // Ngăn Jackson serialize thuộc tính components của Jewelry
    @ManyToMany(mappedBy = "components")
    private List<Jewelry> jewelryList = new ArrayList<>();

    public void setJewelryList(List<Jewelry> jewelryList) {
        this.jewelryList = jewelryList;
    }
}
