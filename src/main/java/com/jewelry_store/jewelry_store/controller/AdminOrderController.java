package com.jewelry_store.jewelry_store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Orderr;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.service.Order.OrderService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/order/area/{id}")
    public ResponseEntity<List<Orderr>> getOrderHistory(
        @PathVariable Long id, @RequestParam(required = false) String order_status,
        @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        List<Orderr> orders= orderService.getAreaOrder(id, order_status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


    @PutMapping("/orders/{id}/{orderStatus}")
    public ResponseEntity <Orderr> updateOrderStatus(
        @PathVariable Long id, 
        @PathVariable String orderstatus,
        @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Orderr order= orderService.updatOrder(id, orderstatus);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
