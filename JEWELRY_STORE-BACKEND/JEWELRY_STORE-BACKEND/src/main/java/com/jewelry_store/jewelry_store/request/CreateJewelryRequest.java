package com.jewelry_store.jewelry_store.request;

import java.util.ArrayList;
import java.util.List;

import com.jewelry_store.jewelry_store.model.Category;

import lombok.Data;

@Data
public class CreateJewelryRequest {
    private String name;

    private String description;

    private double GoldWeight;

    private double DiamondWeight;

    private Category jewelryCategory;

    private List<String> images;

    private String code ;

    private List<String> components;

    public CreateJewelryRequest(){
        this.components = new ArrayList<>();
    }
}
