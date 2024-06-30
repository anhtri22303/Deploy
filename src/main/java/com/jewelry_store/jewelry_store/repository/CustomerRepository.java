package com.jewelry_store.jewelry_store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByFullnameAndMobileAndEmail(String fullname, String mobile, String email);
}

