package com.jewelry_store.jewelry_store.service.Warranty;

import java.util.List;

import com.jewelry_store.jewelry_store.model.Warranty;

public interface WarrantyService {

     public Warranty findWarrantyByOrderId(Long orderId);
     public Warranty findWarrantyById(Long id);
     public List<Warranty> findAllWarranties();
}
