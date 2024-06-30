package com.jewelry_store.jewelry_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.Cart;

public interface CartRepository extends JpaRepository<Cart,Long> {

    public Cart findByStaffId(Long userId);
}
