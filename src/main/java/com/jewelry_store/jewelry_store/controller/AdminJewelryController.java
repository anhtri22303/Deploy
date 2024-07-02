package com.jewelry_store.jewelry_store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Jewelry;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.CreateJewelryRequest;
import com.jewelry_store.jewelry_store.response.MessageResponse;
import com.jewelry_store.jewelry_store.service.Jewelry.JewelryService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api/admin/jewelry")
public class AdminJewelryController {

    @Autowired
    private JewelryService jewelryService;
    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<Jewelry> createJewelry(@RequestBody CreateJewelryRequest req,
                                                @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Jewelry jewelry = jewelryService.createJewelry(req);
        
        return new ResponseEntity<>(jewelry, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteJewelry(@PathVariable Long id,
                                                @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
       
        jewelryService.deleteJewelry(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Jewelry deleted sucessfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Jewelry> updateJewelryAvaibilityStatus(@PathVariable Long id,
                                                    @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
       
        Jewelry jewelry = jewelryService.updateAvailibityStatus(id); 

        return new ResponseEntity<>(jewelry, HttpStatus.CREATED);
    }
    @PutMapping("/updatePrices")
    public ResponseEntity<Void> updatePricesFromComponentChanges(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        jewelryService.updatePricesFromComponentChanges();
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
