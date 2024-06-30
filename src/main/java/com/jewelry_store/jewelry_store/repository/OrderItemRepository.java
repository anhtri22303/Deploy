package com.jewelry_store.jewelry_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

}
