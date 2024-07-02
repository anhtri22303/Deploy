package com.jewelry_store.jewelry_store.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Buyback;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.BuybackRequest;
import com.jewelry_store.jewelry_store.request.CreateJewelryRequest;
import com.jewelry_store.jewelry_store.request.RequestWrapper;
import com.jewelry_store.jewelry_store.service.Buyback.BuybackService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api/buyback")
public class BuybackController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private BuybackService buybackService;

    @PostMapping("/create")
    public ResponseEntity<Buyback> createBuyback(@RequestBody BuybackRequest buybackRequest, 
        @RequestParam String jewelryCode, 
        @RequestHeader("Authorization") String jwt) throws Exception {
            
            User user = userService.findUserByJwtToken(jwt);
            Buyback buyback = buybackService.createBuyback(buybackRequest, jewelryCode, user);
            return new ResponseEntity<>(buyback, HttpStatus.CREATED);
       
}
         @PostMapping("/create/out")
    public ResponseEntity<Buyback> createBuybackOut(@RequestBody RequestWrapper requestWrapper,  
                                                    @RequestHeader("Authorization") String jwt) throws Exception {
         
            User user = userService.findUserByJwtToken(jwt);
            BuybackRequest buybackRequest = requestWrapper.getBuybackRequest();
            CreateJewelryRequest newJewelryRequest = requestWrapper.getCreateJewelryRequest();
            // Set user ID or retrieve user from database
            Buyback buyback = buybackService.createBuybackOut(buybackRequest, newJewelryRequest, user);
            return new ResponseEntity<>(buyback, HttpStatus.CREATED);
                                                    }
    @GetMapping("/{id}")
    public ResponseEntity<Buyback> getBuybackById(@PathVariable Long id) {
        Optional<Buyback> buyback = buybackService.getBuybackById(id);
        return buyback.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET endpoint to retrieve all buybacks
    @GetMapping
    public List<Buyback> getAllBuybacks() {
        return buybackService.getAllBuybacks();
    }
    
}

