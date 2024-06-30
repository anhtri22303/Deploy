package com.jewelry_store.jewelry_store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jewelry_store.jewelry_store.model.Coupon;

@Repository
public interface CouponRepository extends JpaRepository<Coupon,Long> {
    Optional<Coupon> findByCode(String code);
}
