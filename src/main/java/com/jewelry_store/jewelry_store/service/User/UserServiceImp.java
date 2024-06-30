package com.jewelry_store.jewelry_store.service.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.config.JwtProvider;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String name = jwtProvider.getUserFromJwtToken(jwt);
        User user = findUserbyUsername(name);
        return user;
    }

    @Override
    public User findUserbyUsername(String username) throws Exception {
    User user = userRepository.findByUsername(username);

    if(user == null){
        throw new Exception("User not found");
    }
    return user;
    }

}
