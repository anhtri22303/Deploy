package com.jewelry_store.jewelry_store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.Component;

public interface ComponentRepository extends JpaRepository<Component, Long>  {
    Optional<Component> findByName(String name);
    List<Component> findAllById(Iterable<Long> ids);
}
