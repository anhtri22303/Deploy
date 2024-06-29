package com.jewelry_store.jewelry_store.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.jewelry_store.jewelry_store.model.Coupon;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.CouponRequest;
import com.jewelry_store.jewelry_store.service.Coupon.CouponService;
import com.jewelry_store.jewelry_store.service.User.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/coupon")
public class AdminCoupon {

    @Autowired
    private UserService userService;

    @Autowired
    private CouponService couponService;

    @GetMapping
    public List<Coupon> getAllCoupons( @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        return couponService.getAllCoupons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coupon> getCouponById(@PathVariable Long id,
    @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Optional<Coupon> coupon = couponService.getCouponById(id);
        return coupon.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Coupon> createCoupon(@Valid @RequestBody CouponRequest couponRequest,
    @RequestHeader("Authorization") String jwt) throws Exception {
        
        User user = userService.findUserByJwtToken(jwt);
        Coupon createdCoupon = couponService.createCoupon(couponRequest);
        return ResponseEntity.ok(createdCoupon);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Coupon> updateCoupon(@PathVariable Long id, @Valid @RequestBody CouponRequest couponRequest,
    @RequestHeader("Authorization") String jwt) throws Exception {
        
        User user = userService.findUserByJwtToken(jwt);
        Optional<Coupon> updatedCoupon = couponService.updateCoupon(id, couponRequest);
        return updatedCoupon.map(ResponseEntity::ok)
                            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id,
    @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        boolean isDeleted = couponService.deleteCoupon(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
