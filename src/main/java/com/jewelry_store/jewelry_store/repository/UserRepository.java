package com.jewelry_store.jewelry_store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jewelry_store.jewelry_store.model.USER_ROLE;
import com.jewelry_store.jewelry_store.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);
    public List<User> findByRole(USER_ROLE role);
}
