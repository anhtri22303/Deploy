package com.jewelry_store.jewelry_store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Area;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.CreateAreaRequest;
import com.jewelry_store.jewelry_store.response.MessageResponse;
import com.jewelry_store.jewelry_store.service.Area.AreaService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api/admin/area")
public class AdminAreaController {

    @Autowired
    private AreaService areaService;
    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Area> createArea(
    @RequestBody CreateAreaRequest req ,
    @RequestHeader("Authorization") String jwt
    ) throws Exception  {
    User user = userService.findUserByJwtToken((jwt));

    Area area = areaService.createArea(req, user);
    return new ResponseEntity<>(area, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Area> updateArea(
    @RequestBody CreateAreaRequest req ,
    @RequestHeader("Authorization") String jwt,
    @PathVariable Long id
    ) throws Exception  {
    User user = userService.findUserByJwtToken((jwt));

    Area area = areaService.updateArea(id, req);
    return new ResponseEntity<>(area, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteArea(
    @RequestHeader("Authorization") String jwt,
    @PathVariable Long id
    ) throws Exception  {
    User user = userService.findUserByJwtToken((jwt));

    MessageResponse res = new MessageResponse();
    res.setMessage("Are deleted successfully");
    return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Area> updateAreaStatus(
        @RequestBody CreateAreaRequest req ,
        @RequestHeader("Authorization") String jwt,
        @PathVariable Long id
        ) throws Exception  {
        User user = userService.findUserByJwtToken((jwt));
    
        Area area = areaService.updateAreaStatus(id);
        return new ResponseEntity<>(area, HttpStatus.OK);
        }

        @GetMapping("/user")
    public ResponseEntity<Area> findAreabyUserId(
        @RequestHeader("Authorization") String jwt
        ) throws Exception  {
        User user = userService.findUserByJwtToken((jwt));
    
        Area area = areaService.getAreabyUserId(user.getId());
        return new ResponseEntity<>(area, HttpStatus.OK);
        }

    
}
