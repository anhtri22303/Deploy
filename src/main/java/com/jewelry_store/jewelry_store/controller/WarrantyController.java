package com.jewelry_store.jewelry_store.controller;

import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.model.Warranty;
import com.jewelry_store.jewelry_store.service.User.UserService;
import com.jewelry_store.jewelry_store.service.Warranty.WarrantyService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/warranties")
public class WarrantyController {

    @Autowired
    private WarrantyService warrantyService;
    @Autowired
    private UserService userService;

    // Endpoint to get warranty by orderId
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Warranty> getWarrantyByOrderId(@PathVariable Long orderId,
    @RequestHeader("Authorization") String jwt) throws Exception {
        try {
            User user = userService.findUserByJwtToken(jwt);
            Warranty warranty = warrantyService.findWarrantyByOrderId(orderId);
            if (warranty != null) {
                return ResponseEntity.ok(warranty);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Warranty> getWarrantyById(@PathVariable Long id,
    @RequestHeader("Authorization") String jwt) throws Exception {
        try {
            User user = userService.findUserByJwtToken(jwt);
            Warranty warranty = warrantyService.findWarrantyById(id);
            if (warranty != null) {
                return ResponseEntity.ok(warranty);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint to get all warranties
    @GetMapping
    public ResponseEntity<List<Warranty>> getAllWarranties(
        @RequestHeader("Authorization") String jwt) throws Exception {
        try {
            User user = userService.findUserByJwtToken(jwt);
            List<Warranty> warranties = warrantyService.findAllWarranties();
            return ResponseEntity.ok(warranties);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


