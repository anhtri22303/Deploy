package com.jewelry_store.jewelry_store.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullname;

    private String username;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String gender;

    private String email;
    
    private USER_ROLE role;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "staff")
    private List<Orderr> orders = new ArrayList<>();

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "staff")
    private Area area; 
}