package com.jewelry_store.jewelry_store.request;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCartItemByCodeRequest {
    private String code;
    private int quantity;
    private List<String> components;
}