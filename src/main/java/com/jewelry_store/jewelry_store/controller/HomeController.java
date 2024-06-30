package com.jewelry_store.jewelry_store.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public ResponseEntity<String> HomeController(){
        return new ResponseEntity<>("Có khó khăn mới là đi lên dốc",HttpStatus.OK);
    }
}
