package com.jewelry_store.jewelry_store.service.User;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.USER_ROLE;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.repository.UserRepository;

@Service
public class StaffUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username);
    if(user==null){
        throw new UsernameNotFoundException("User not found with username : "+username);
    }
    USER_ROLE role = user.getRole();
    List<GrantedAuthority> authorities = new ArrayList<>();

    authorities.add(new SimpleGrantedAuthority(role.toString()));

    return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    

}
