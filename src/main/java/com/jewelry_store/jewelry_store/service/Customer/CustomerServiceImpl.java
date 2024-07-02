package com.jewelry_store.jewelry_store.service.Customer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Customer;
import com.jewelry_store.jewelry_store.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Optional<Customer> updateCustomer(Long id, Customer req) throws Exception {
        return customerRepository.findById(id).map(customer -> {
            customer.setFullname(req.getFullname());
            customer.setEmail(req.getMobile());
            customer.setEmail(req.getEmail());
            return customerRepository.save(customer);
        });
      }

    @Override
    public List<Customer> getAllCustomer() throws Exception {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(Long id) throws Exception {
        return customerRepository.findById(id);
    }

}
