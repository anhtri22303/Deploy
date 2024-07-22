package com.jewelry_store.jewelry_store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.Orderr;

public interface OrderRepository extends JpaRepository<Orderr,Long> {

    public List<Orderr> findByStaffId(Long userId);
    public List<Orderr> findByOrderStatus(String status);
    public List<Orderr> findByAreaId(Long areaId);
    public List<Orderr> findByAreaIdAndOrderStatus(Long areaId, String orderStatus);

}
