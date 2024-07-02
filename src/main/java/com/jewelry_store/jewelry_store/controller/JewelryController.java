package com.jewelry_store.jewelry_store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Category;
import com.jewelry_store.jewelry_store.model.Jewelry;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.service.Jewelry.JewelryService;
import com.jewelry_store.jewelry_store.service.User.UserService;


@RestController
@RequestMapping("/api/jewelry")
public class JewelryController {

    
    @Autowired
    private JewelryService jewelryService;
    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Jewelry>> searchJewelry(@RequestParam String name,
                                                @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        
        List<Jewelry> jewelries = jewelryService.searchJewelry(name);
                                                    
        return new ResponseEntity<>(jewelries, HttpStatus.CREATED);
    }
  
     @GetMapping("/getAll")
    public ResponseEntity<List<Jewelry>> getAllJewelry(
            @RequestHeader("Authorization") String jwt) throws Exception {

        // Validate user based on JWT token
        User user = userService.findUserByJwtToken(jwt);
        
        // Get all categories
        List<Jewelry> jewelries =  jewelryService.getAllJewelry();

        return ResponseEntity.ok(jewelries);
    }
    @PostMapping("/calculateBuybackPrice")
    public double calculateBuybackPrice(@RequestBody Jewelry jewelry,
    @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        return jewelryService.calculateBuybackPrice(jewelry);
    }

    @PostMapping("/calculateBuybackPriceOut")
    public ResponseEntity<Double> calculateBuybackPriceOut(
        @RequestParam double goldWeight,
        @RequestParam double diamondWeight,
        @RequestBody List<String> componentsName,
        @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);    
        double buybackPrice = jewelryService.calculateBuybackPriceOut(goldWeight, diamondWeight, componentsName);
    return ResponseEntity.ok(buybackPrice);
    }
    @GetMapping("/findByCode")
    public ResponseEntity<Jewelry> findJewelryByCode(@RequestParam String code,
    @RequestHeader("Authorization") String jwt  ) throws Exception{
            Jewelry jewelry = jewelryService.findJewelryByCode(code);
            return ResponseEntity.ok(jewelry);

    }
}
