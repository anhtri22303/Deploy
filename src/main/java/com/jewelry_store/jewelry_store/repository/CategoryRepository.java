package com.jewelry_store.jewelry_store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findByName(String name);
}
