package com.jewelry_store.jewelry_store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.Area;

public interface AreaRepository extends JpaRepository<Area,Long> {
    Optional<Area> findByName(String name);
    Area findByStaffId(Long userId);

}
