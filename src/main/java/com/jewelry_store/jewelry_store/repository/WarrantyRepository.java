package com.jewelry_store.jewelry_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.Warranty;

public interface WarrantyRepository extends JpaRepository<Warranty, Long> {
            Warranty findByOrderId(Long orderId);
}
