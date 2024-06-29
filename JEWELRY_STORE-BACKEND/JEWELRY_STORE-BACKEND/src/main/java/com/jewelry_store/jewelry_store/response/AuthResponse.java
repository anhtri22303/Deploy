package com.jewelry_store.jewelry_store.response;

import com.jewelry_store.jewelry_store.model.USER_ROLE;
import lombok.Data;

@Data 
public class AuthResponse {

    private String jwt;

    private String message;

    private USER_ROLE role;
}
