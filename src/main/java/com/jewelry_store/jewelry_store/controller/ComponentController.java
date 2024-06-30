package com.jewelry_store.jewelry_store.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Component;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.ComponentRequest;
import com.jewelry_store.jewelry_store.service.Component.ComponentService;
import com.jewelry_store.jewelry_store.service.User.UserService;


@RestController
@RequestMapping("/api/component")
@CrossOrigin(origins = "http://localhost:3000")
public class ComponentController {
    @Autowired
    private ComponentService componentService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/ids")
    public ResponseEntity<List<Component>> getComponentsByIds(@RequestParam List<Long> ids,
                                                              @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Component> components = componentService.findByIds(ids);
        return new ResponseEntity<>(components, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Component> getComponentById(@PathVariable Long id,
    @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);
        Optional<Component> component = componentService.findById(id);
        if (component.isPresent()) {
            return new ResponseEntity<>(component.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Component> getComponentByName(@PathVariable String name,
    @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);
        Optional<Component> component = componentService.findByName(name);
        if (component.isPresent()) {
            return new ResponseEntity<>(component.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComponent(@PathVariable Long id,
    @RequestHeader("Authorization") String jwt) throws Exception{ 

        User user = userService.findUserByJwtToken(jwt);
        if (componentService.deleteComponent(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}