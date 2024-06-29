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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Cart;
import com.jewelry_store.jewelry_store.model.CartItem;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.AddCartItemByCodeRequest;
import com.jewelry_store.jewelry_store.request.AddCartItemRequest;
import com.jewelry_store.jewelry_store.request.UpdateCartItemRequest;
import com.jewelry_store.jewelry_store.service.Cart.CartService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api")
public class Cartcontroller {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;
  
    @PutMapping("/cart/add")
    public ResponseEntity<?> updateCartItem(@RequestBody AddCartItemRequest request, 
    @RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwtToken(jwt);
            CartItem cartItem = cartService.addItemToCart(request, jwt);
            return ResponseEntity.ok(cartItem); // Trả về phản hồi HTTP 200 (OK) với đối tượng CartItem
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Trả về phản hồi HTTP 400 (Bad Request) với thông điệp lỗi
        }
    }


    @PutMapping("/cart/addByCode")
    public ResponseEntity<?> addItemToCartByCode(@RequestBody AddCartItemByCodeRequest req,
     @RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwtToken(jwt);
            CartItem cartItem = cartService.addItemToCartByCode(req, jwt);
            return ResponseEntity.ok(cartItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/cart/cart-item/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(@RequestBody UpdateCartItemRequest req,
    @RequestHeader("Authorization") String jwt) throws Exception{
        
        User user = userService.findUserByJwtToken(jwt);
        CartItem cartItem = cartService.updateCartItemQuantity(req.getCartItemId(), req.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }
    @DeleteMapping("/cart-item/{id}/remove")
    public ResponseEntity<Cart> removeCartItem(@PathVariable Long id,
    @RequestHeader("Authorization") String jwt) throws Exception{
        
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.removeItemFromCart(id, jwt);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(
    @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.clearCart(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }


    @GetMapping("/cart")
    public ResponseEntity<Cart> findUserCart(
    @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findCartByUserId(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }
    
    @PostMapping("/cart/{cartId}/apply-coupon")
    public Cart applyCoupon(@PathVariable Long cartId, @RequestParam String couponCode,
    @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return cartService.applyCouponToCart(cartId, couponCode);
    }

}

