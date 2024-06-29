package com.jewelry_store.jewelry_store.request;

import lombok.Data;

@Data
public class UpdateCartItemRequest {
    private Long cartItemId;
    private int quantity;
}
