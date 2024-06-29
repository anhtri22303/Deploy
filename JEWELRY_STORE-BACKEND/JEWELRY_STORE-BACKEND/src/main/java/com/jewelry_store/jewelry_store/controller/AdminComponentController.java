package com.jewelry_store.jewelry_store.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Component;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.ComponentRequest;
import com.jewelry_store.jewelry_store.service.Component.ComponentService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api/admin/component")
public class AdminComponentController {
@Autowired
    private ComponentService componentService;
    
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Component> createComponent(@RequestBody ComponentRequest req,
    @RequestHeader("Authorization") String jwt) throws Exception{ 
      
        User user = userService.findUserByJwtToken(jwt);
        Component createComponent = componentService.createComponent(req);
       return new ResponseEntity<>(createComponent, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Component>> getAllComponents(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Component> components = componentService.findAll();
        return new ResponseEntity<>(components, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Component> updateComponent(@PathVariable Long id, @RequestBody ComponentRequest req,
    @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);
        Optional<Component> updatedComponent = componentService.updateComponent(id, req);
        if (updatedComponent.isPresent()) {
            return new ResponseEntity<>(updatedComponent.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}


    


