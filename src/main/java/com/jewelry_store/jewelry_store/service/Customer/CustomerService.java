package com.jewelry_store.jewelry_store.service.Customer;

import java.util.List;
import java.util.Optional;

import com.jewelry_store.jewelry_store.model.Customer;

public interface CustomerService {

     public Optional<Customer> updateCustomer(Long id, Customer customer) throws Exception;
    public List<Customer> getAllCustomer() throws Exception ;
    public Optional<Customer> getCustomerById(Long id) throws Exception ;
}
