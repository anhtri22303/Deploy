package com.jewelry_store.jewelry_store.request;

import lombok.Data;

@Data
public class OrderRequest {
    private Long staffId;

    // thong tin cua customer
    private String fullname;
    private String mobile;
    private String email;
}
