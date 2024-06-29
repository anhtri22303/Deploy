package com.jewelry_store.jewelry_store.request;

import java.util.List;

import com.jewelry_store.jewelry_store.model.ContactInformation;

import lombok.Data;

@Data
public class CreateAreaRequest {
    private Long id;
    private String name;
    private String desciption;
    private ContactInformation contactInformation;
    private String openingHours;
    private List<String> images;
    
}
