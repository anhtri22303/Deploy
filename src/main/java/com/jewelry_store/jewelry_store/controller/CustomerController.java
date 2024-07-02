package com.jewelry_store.jewelry_store.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Coupon;
import com.jewelry_store.jewelry_store.model.Customer;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.repository.CustomerRepository;
import com.jewelry_store.jewelry_store.request.CouponRequest;
import com.jewelry_store.jewelry_store.service.Customer.CustomerService;
import com.jewelry_store.jewelry_store.service.User.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserService userService;

   @GetMapping
    public List<Customer> getAllCustomer( @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        return customerService.getAllCustomer();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCouponById(@PathVariable Long id,
    @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Optional<Customer> customer = customerService.getCustomerById(id);
        return customer.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCoupon(@PathVariable Long id,@RequestBody Customer customer,
    @RequestHeader("Authorization") String jwt) throws Exception {
        
        User user = userService.findUserByJwtToken(jwt);
        Optional<Customer> updateCustomer = customerService.updateCustomer(id, customer);
        return updateCustomer.map(ResponseEntity::ok)
                            .orElseGet(() -> ResponseEntity.notFound().build());
    }
    }
