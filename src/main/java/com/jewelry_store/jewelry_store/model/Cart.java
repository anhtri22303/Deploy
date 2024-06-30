package com.jewelry_store.jewelry_store.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private User staff;

    private Double total = 0.0;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    @OneToOne
    private Coupon coupon;

    public void applyCoupon(Coupon coupon) {
        this.coupon = coupon;
        applyDiscountToItems();
        recalculateTotal();
    }

    public void recalculateTotal() {
        double itemsTotal = items.stream().mapToDouble(CartItem::getTotalPrice).sum();
        if (coupon != null && isValidCoupon()) {
            double discount = itemsTotal * (coupon.getDiscountPercentage() / 100);
            this.total = itemsTotal - discount;
        } else {
            this.total = itemsTotal;
        }
        System.out.println("Recalculated total: " + this.total); // Log the recalculated total
    }

    private void applyDiscountToItems() {
        if (coupon != null && isValidCoupon()) {
            double discountPercentage = coupon.getDiscountPercentage();
            for (CartItem item : items) {
                item.setDiscountedPrice(discountPercentage);
            }
        } else {
            for (CartItem item : items) {
                item.setDiscountedPrice(0); // Không có giảm giá
            }
        }
    }

    private boolean isValidCoupon() {
        Date now = new Date();
        return (coupon.getValidFrom().before(now) || coupon.getValidFrom().equals(now)) &&
               (coupon.getValidUntil().after(now) || coupon.getValidUntil().equals(now));
    }
}
