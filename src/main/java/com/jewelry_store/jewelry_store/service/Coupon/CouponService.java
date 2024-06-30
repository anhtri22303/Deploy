package com.jewelry_store.jewelry_store.service.Coupon;

import java.util.List;
import java.util.Optional;

import com.jewelry_store.jewelry_store.model.Coupon;
import com.jewelry_store.jewelry_store.request.CouponRequest;

public interface CouponService {

    public Coupon createCoupon(CouponRequest couponRequest) throws Exception;

    public Optional<Coupon> updateCoupon(Long id, CouponRequest couponRequest) throws Exception;
    
    public boolean deleteCoupon(Long id) throws Exception;

    public List<Coupon> getAllCoupons() throws Exception ;

    public Optional<Coupon> getCouponById(Long id) throws Exception ;

    public Optional<Coupon> getCouponByCode(String code) throws Exception ;

}
