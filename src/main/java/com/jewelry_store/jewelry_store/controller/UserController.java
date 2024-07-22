package com.jewelry_store.jewelry_store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.config.JwtProvider;
import com.jewelry_store.jewelry_store.model.Cart;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.repository.CartRepository;
import com.jewelry_store.jewelry_store.repository.UserRepository;
import com.jewelry_store.jewelry_store.service.User.StaffUserDetailService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/staff")
    public List<User> getAllStaffUsers(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return userService.getAllStaffUsers();
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user,
    @RequestHeader("Authorization") String jwt) throws Exception{
        User user1 = userService.findUserByJwtToken(jwt);
    User isUsernameExist = userRepository.findByUsername(user.getUsername());
       if(isUsernameExist!=null){
        throw new Exception("Username is exist");
       }
       User createUser = new User();
       createUser.setFullname(user.getFullname());
       createUser.setUsername(user.getUsername());
       createUser.setPassword(passwordEncoder.encode(user.getPassword()));
       createUser.setGender(user.getGender());
       createUser.setEmail(user.getEmail());
       createUser.setRole(user.getRole());

       User savaUser = userRepository.save(createUser);

       Cart cart = new Cart();
       cart.setStaff(savaUser);
       cartRepository.save(cart);
       return new ResponseEntity<>(savaUser, HttpStatus.OK);
      }

}

