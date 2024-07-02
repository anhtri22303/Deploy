package com.jewelry_store.jewelry_store.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestWrapper {
    private BuybackRequest buybackRequest;
    private CreateJewelryRequest createJewelryRequest;


}
