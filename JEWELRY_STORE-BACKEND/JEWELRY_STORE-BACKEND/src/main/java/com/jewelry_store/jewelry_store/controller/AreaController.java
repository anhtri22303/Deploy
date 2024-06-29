package com.jewelry_store.jewelry_store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Area;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.service.Area.AreaService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api/areas")
public class AreaController {

    
    @Autowired
    private AreaService areaService;
    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<Area>> getAllArea(
    @RequestHeader("Authorization") String jwt
    ) throws Exception  {
    User user = userService.findUserByJwtToken((jwt));

    List<Area> areas = areaService.getAllArea();
    return new ResponseEntity<>(areas, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Area> findAreabyId(
        @RequestHeader("Authorization") String jwt,
        @PathVariable Long id
        ) throws Exception  {
        User user = userService.findUserByJwtToken(jwt);
        Area area = areaService.findAreabyId(id);
        return new ResponseEntity<>(area, HttpStatus.OK);
}
}
