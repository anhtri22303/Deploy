package com.jewelry_store.jewelry_store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.service.Order.OrderService;
import com.jewelry_store.jewelry_store.service.User.UserService;


@RestController
@RequestMapping("/api/dashboard")
public class DashBoardController {
    
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/total-orders/{status}")
    public long getTotalNumberOfOrdersByStatus(@PathVariable String status
    , @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return orderService.getTotalNumberOfOrdersByStatus(status);
    }

    @GetMapping("/total-amount/{status}")
    public double getTotalAmountOfOrdersByStatus(@PathVariable String status,
    @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return orderService.getTotalAmountOfOrdersByStatus(status);
    }



    @GetMapping("/total-sold-items/{status}")
    public int getTotalSoldItemsByStatus(@PathVariable String status,
    @RequestHeader("Authorization") String jwt) throws Exception {
        return orderService.getTotalSoldItemsByStatus(status);
    }

    @GetMapping("/total-amount/area")
    public double getTotalAmount(@RequestParam Long areaId, @RequestParam String orderStatus,
    @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return orderService.getTotalAmountByAreaAndStatus(areaId, orderStatus);
    }

    @GetMapping("/total-orders/area")
    public long getTotalOrders(@RequestParam Long areaId, @RequestParam String orderStatus,
    @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return orderService.getTotalOrdersByAreaAndStatus(areaId, orderStatus);
    }

    @GetMapping("/total-items/area")
    public int getTotalItems(@RequestParam Long areaId, @RequestParam String orderStatus,
    @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return orderService.getTotalItemsByAreaAndStatus(areaId, orderStatus);
    }
}


