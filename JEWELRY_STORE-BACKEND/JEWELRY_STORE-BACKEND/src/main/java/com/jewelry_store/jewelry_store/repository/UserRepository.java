package com.jewelry_store.jewelry_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);
}
