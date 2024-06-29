package com.jewelry_store.jewelry_store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jewelry_store.jewelry_store.model.Jewelry;

public interface JewelryRepository extends JpaRepository<Jewelry,Long> {

    @Query("SELECT j FROM Jewelry j WHERE j.name LIKE  %:keyword% OR j.jewelryCategory.name LIKE %:keyword% ")
    List<Jewelry> searchJewelry(@Param("keyword") String keyword); 
    
    Optional<Jewelry> findByCode(String code);
}
