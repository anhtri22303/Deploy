package com.jewelry_store.jewelry_store.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Customer;
import com.jewelry_store.jewelry_store.repository.CustomerRepository;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<Customer> checkOrCreateCustomer(@RequestBody Customer customer) {
        Optional<Customer> existingCustomer = customerRepository.findByFullnameAndMobileAndEmail(
            customer.getFullname(), customer.getMobile(), customer.getEmail());

        if (existingCustomer.isPresent()) {
            return ResponseEntity.ok(existingCustomer.get());
        } else {
            Customer newCustomer = customerRepository.save(customer);
            return ResponseEntity.ok(newCustomer);
        }
    }
}