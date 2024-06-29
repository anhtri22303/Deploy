package com.jewelry_store.jewelry_store.service.Cart;

import com.jewelry_store.jewelry_store.model.Cart;
import com.jewelry_store.jewelry_store.model.CartItem;
import com.jewelry_store.jewelry_store.request.AddCartItemByCodeRequest;
import com.jewelry_store.jewelry_store.request.AddCartItemRequest;

public interface CartService {
public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

public CartItem addItemToCartByCode(AddCartItemByCodeRequest req, String jwt) throws Exception;

public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

public Cart removeItemFromCart (Long cartItemId, String jwt) throws Exception;

public double calculateCartTotals(Cart cart)throws Exception;

public Cart findCartById(Long id) throws Exception;

public Cart findCartByUserId(Long userId) throws Exception;

public Cart clearCart(Long userId) throws Exception;

public Cart applyCouponToCart(Long cartId, String couponCode) throws Exception;

}
