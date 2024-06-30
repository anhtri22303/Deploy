package com.jewelry_store.jewelry_store.request;

import lombok.Data;

@Data
public class ComponentRequest {
    private Long id;
    private String name;
    private double price ;
    private double pricebuyback;
}
