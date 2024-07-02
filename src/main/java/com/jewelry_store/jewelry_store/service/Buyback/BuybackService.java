package com.jewelry_store.jewelry_store.service.Buyback;

import java.util.List;
import java.util.Optional;

import com.jewelry_store.jewelry_store.model.Buyback;
import com.jewelry_store.jewelry_store.model.Customer;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.BuybackRequest;
import com.jewelry_store.jewelry_store.request.CreateJewelryRequest;

public interface BuybackService {

    public Buyback createBuyback(BuybackRequest buyback, String jewelryCode, 
    User user) throws Exception;

    public Buyback createBuybackOut(BuybackRequest buybackreq, 
    CreateJewelryRequest newJewelryRequest, User user) throws Exception;

    public Optional<Buyback> getBuybackById(Long id);

    public List<Buyback> getAllBuybacks();

    // public Buyback updateBuyback(Long id, Buyback buybackDetails, Long customerId) throws Exception;

    public void deleteBuyback(Long id);
}
