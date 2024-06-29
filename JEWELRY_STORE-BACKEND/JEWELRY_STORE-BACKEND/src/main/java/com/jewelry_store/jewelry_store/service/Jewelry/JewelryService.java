package com.jewelry_store.jewelry_store.service.Jewelry;

import java.util.List;

import com.jewelry_store.jewelry_store.model.Category;
import com.jewelry_store.jewelry_store.model.Jewelry;
import com.jewelry_store.jewelry_store.request.CreateJewelryRequest;

public interface JewelryService {

    public Jewelry createJewelry(CreateJewelryRequest req,Category category) throws Exception;
    
    public void deleteJewelry(Long jewelryid) throws Exception;

    public List<Jewelry> searchJewelry(String keyword);

    public Jewelry FindJewelryById(Long jewelryId) throws Exception;

    public Jewelry updateAvailibityStatus(Long jewelryId)throws Exception;
    
    public double calculateJewelryPrice(Jewelry jewelry);

    public void updatePricesFromComponentChanges();

    public List<Jewelry> getAllJewelry() throws Exception;

    public Jewelry findJewelryByCode(String code) throws Exception;


}
