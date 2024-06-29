package com.jewelry_store.jewelry_store.request;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CouponRequest {

    @NotBlank(message = "Name is mandatory")
    @Size(max = 255, message = "Name should not exceed 255 characters")
    private String name;

    @NotBlank(message = "Code is mandatory")
    @Size(max = 50, message = "Code should not exceed 50 characters")
    private String code;

    @Positive(message = "Discount percentage must be positive")
    private double discountPercentage;

    @NotNull(message = "Valid from date is mandatory")
    private Date validFrom;

    @NotNull(message = "Valid until date is mandatory")
    private Date validUntil;

}

