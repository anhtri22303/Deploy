package com.jewelry_store.jewelry_store.service.Cart;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Cart;
import com.jewelry_store.jewelry_store.model.CartItem;
import com.jewelry_store.jewelry_store.model.Coupon;
import com.jewelry_store.jewelry_store.model.Jewelry;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.repository.CartItemRepository;
import com.jewelry_store.jewelry_store.repository.CartRepository;
import com.jewelry_store.jewelry_store.repository.CouponRepository;
import com.jewelry_store.jewelry_store.request.AddCartItemByCodeRequest;
import com.jewelry_store.jewelry_store.request.AddCartItemRequest;
import com.jewelry_store.jewelry_store.service.Jewelry.JewelryService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@Service


public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private JewelryService jewelryService;

    @Autowired
    private CouponRepository couponRepository;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Jewelry jewelry = jewelryService.FindJewelryById(req.getJewelryId());
        Cart cart = cartRepository.findByStaffId(user.getId());


        for (CartItem cartItem : cart.getItems()) {
            if (cartItem.getJewelry().equals(jewelry)) {
                int newQuantity = cartItem.getQuantity() + req.getQuanity();
                CartItem updatedItem = updateCartItemQuantity(cartItem.getId(), newQuantity);
                cart.recalculateTotal(); // Recalculate total after adding item
                cartRepository.save(cart); // Save the cart
                return updatedItem;
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setJewelry(jewelry);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuanity());
        newCartItem.setComponents(req.getComponents());
        newCartItem.setTotalPrice(req.getQuanity() * jewelry.getPrice());
        newCartItem.setTotalamount(newCartItem.getTotalPrice());
        CartItem saveCartItem = cartItemRepository.save(newCartItem);

        cart.getItems().add(saveCartItem);
        cart.recalculateTotal(); // Recalculate total after adding item
        cart.setTotalamount(cart.getTotal());
        cartRepository.save(cart); // Save the cart

        return saveCartItem;   
    }

    @Override
    public CartItem addItemToCartByCode(AddCartItemByCodeRequest req, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Jewelry jewelry = jewelryService.findJewelryByCode(req.getCode());
        Cart cart = cartRepository.findByStaffId(user.getId());

        

        for (CartItem cartItem : cart.getItems()) {
            if (cartItem.getJewelry().equals(jewelry)) {
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                CartItem updatedItem = updateCartItemQuantity(cartItem.getId(), newQuantity);
                cart.recalculateTotal(); // Recalculate total after adding item
                cartRepository.save(cart); // Save the cart
                return updatedItem;
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setJewelry(jewelry);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setComponents(req.getComponents());
        newCartItem.setTotalPrice(req.getQuantity() * jewelry.getPrice());
        newCartItem.setTotalamount(newCartItem.getTotalPrice());
        
        CartItem saveCartItem = cartItemRepository.save(newCartItem);
        cart.getItems().add(saveCartItem);
        cart.recalculateTotal();
        cart.setTotalamount(cart.getTotal()); // Recalculate total after adding item
        cartRepository.save(cart); // Save the cart

        return saveCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
            .orElseThrow(() -> new Exception("CartItem not found"));
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(quantity * cartItem.getJewelry().getPrice());
        CartItem updatedCartItem = cartItemRepository.save(cartItem);

        Cart cart = cartItem.getCart();
        cart.recalculateTotal(); // Recalculate total after updating item quantity
        cartRepository.save(cart); // Save the cart

        return updatedCartItem;
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartRepository.findByStaffId(user.getId());
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()) {
            throw new Exception("CartItem not found");
        }
        CartItem item = cartItemOptional.get();

        cart.getItems().remove(item);
        cart.recalculateTotal(); // Recalculate total after removing item
        cartRepository.save(cart); // Save the cart

        return cart;
    }

    @Override
    public double calculateCartTotals(Cart cart) throws Exception {
        double total = 0;
        for (CartItem cartItem : cart.getItems()) {
            total += cartItem.getTotalPrice(); // Calculate total based on totalPrice
        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isEmpty()) {
            throw new Exception("Cart not found id" + id);
        }
        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        Cart cart = cartRepository.findByStaffId(userId);
        cart.recalculateTotal(); // Recalculate total after retrieving the cart
        return cart;
    }


    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart = findCartByUserId(userId);
    
        // Remove coupon from cart
        cart.setCoupon(null);
    
        // Clear cart items
        cart.getItems().clear();
    
        // Reset total amount
        cart.setTotal(0.0);
    
        // Recalculate total after clearing the cart
        cart.recalculateTotal();
    
        // Save the updated cart
        return cartRepository.save(cart);
    }

    @Override
    public Cart applyCouponToCart(Long cartId, String couponCode) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        if (cartOpt.isEmpty()) {
            throw new RuntimeException("Cart not found");
        }

        Cart cart = cartOpt.get();
        Optional<Coupon> couponOpt = couponRepository.findByCode(couponCode);
        if (couponOpt.isEmpty()) {
            throw new RuntimeException("Invalid coupon code");
        }

        Coupon coupon = couponOpt.get();
        cart.applyCoupon(coupon);
        double totalamount = 0.0;
        // Update discounted prices in cart items after applying coupon
        for (CartItem cartItem : cart.getItems()) {
            double discountedPrice = calculateDiscountedPrice(cartItem, coupon); // Implement your logic to calculate discounted price
            cartItem.setDiscountedPrice(discountedPrice);
            cartItem.setTotalPrice(discountedPrice * cartItem.getQuantity());
            cartItem.setDiscountPercentage(coupon.getDiscountPercentage());
            cartItem.setOriginalPrice(cartItem.getJewelry().getPrice() * cartItem.getQuantity());
            cartItemRepository.save(cartItem);
        }
        for (CartItem cartItem : cart.getItems()) {
        totalamount += cartItem.getOriginalPrice();
        }
        cart.setTotalamount(totalamount);
        
        return cartRepository.save(cart);
    }

    // Example method to calculate discounted price for a cart item based on a coupon
    private double calculateDiscountedPrice(CartItem cartItem, Coupon coupon) {
        // Implement your logic to calculate discounted price here
        // This is just a placeholder
        return cartItem.getJewelry().getPrice() * (1-coupon.getDiscountPercentage() / 100);
    }
}

