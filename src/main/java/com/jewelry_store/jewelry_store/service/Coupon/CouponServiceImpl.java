package com.jewelry_store.jewelry_store.service.Coupon;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Coupon;
import com.jewelry_store.jewelry_store.repository.CouponRepository;
import com.jewelry_store.jewelry_store.request.CouponRequest;


@Service
public class CouponServiceImpl implements CouponService {

    @Autowired
    private CouponRepository couponRepository;

    @Override
    public Coupon createCoupon(CouponRequest req) throws Exception {
        Coupon coupon = new Coupon();
        coupon.setName(req.getName());
        coupon.setCode(req.getCode());
        coupon.setDiscountPercentage(req.getDiscountPercentage());
        coupon.setValidFrom(req.getValidFrom());
        coupon.setValidUntil(req.getValidUntil());
        return couponRepository.save(coupon);
    }
    
    @Override
    public Optional<Coupon> updateCoupon(Long id, CouponRequest req) throws Exception {
        return couponRepository.findById(id).map(coupon -> {
            coupon.setName(req.getName());
            coupon.setCode(req.getCode());
            coupon.setDiscountPercentage(req.getDiscountPercentage());
            coupon.setValidFrom(req.getValidFrom());
            coupon.setValidUntil(req.getValidUntil());
            return couponRepository.save(coupon);
        });
    }

    @Override
    public boolean deleteCoupon(Long id) throws Exception {
        return couponRepository.findById(id).map(coupon -> {
            couponRepository.delete(coupon);
            return true;
        }).orElse(false);
     }

     public List<Coupon> getAllCoupons() throws Exception{
        return couponRepository.findAll();
    }

    public Optional<Coupon> getCouponById(Long id) throws Exception {
        return couponRepository.findById(id);
    }

    public Optional<Coupon> getCouponByCode(String code) throws Exception {
        return couponRepository.findByCode(code);
    }
}
