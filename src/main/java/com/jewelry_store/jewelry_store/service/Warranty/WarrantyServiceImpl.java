package com.jewelry_store.jewelry_store.service.Warranty;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Warranty;
import com.jewelry_store.jewelry_store.repository.WarrantyRepository;

@Service
public class WarrantyServiceImpl implements WarrantyService {

    @Autowired
    private WarrantyRepository warrantyRepository;

    @Override
    public Warranty findWarrantyByOrderId(Long orderId) {
        return warrantyRepository.findByOrderId(orderId);
    }

    @Override
    public Warranty findWarrantyById(Long id) {
        Optional<Warranty> warrantyOptional = warrantyRepository.findById(id);
        return warrantyOptional.orElse(null);
    }

    @Override
    public List<Warranty> findAllWarranties() {
        return warrantyRepository.findAll();
    }
}
