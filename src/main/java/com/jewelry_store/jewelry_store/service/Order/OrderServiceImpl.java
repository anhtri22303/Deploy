package com.jewelry_store.jewelry_store.service.Order;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jewelry_store.jewelry_store.model.Area;
import com.jewelry_store.jewelry_store.model.Cart;
import com.jewelry_store.jewelry_store.model.CartItem;
import com.jewelry_store.jewelry_store.model.Customer;
import com.jewelry_store.jewelry_store.model.OrderItem;
import com.jewelry_store.jewelry_store.model.Orderr;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.repository.CustomerRepository;
import com.jewelry_store.jewelry_store.repository.OrderItemRepository;
import com.jewelry_store.jewelry_store.repository.OrderRepository;
import com.jewelry_store.jewelry_store.repository.UserRepository;
import com.jewelry_store.jewelry_store.request.OrderRequest;
import com.jewelry_store.jewelry_store.service.Area.AreaService;
import com.jewelry_store.jewelry_store.service.Cart.CartService;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AreaService areaService;

    @Autowired
    private CartService cartService;

    @Autowired
    private CustomerRepository customerRepository;


    @Override
    public Orderr createOrder(OrderRequest orderRequest, User user) throws Exception {
        // Area area = areaService.getAreabyUserId(user.getId());
        Area area = areaService.findAreabyId(orderRequest.getStaffId());
        Customer customer = customerRepository.findByFullnameAndMobileAndEmail(
                orderRequest.getFullname(), orderRequest.getMobile(), orderRequest.getEmail())
                .orElseGet(() -> {
                    Customer newCustomer = new Customer();
                    newCustomer.setFullname(orderRequest.getFullname());
                    newCustomer.setMobile(orderRequest.getMobile());
                    newCustomer.setEmail(orderRequest.getEmail());
                    newCustomer.setPoint(0);  // Khởi tạo điểm về 0
                    return customerRepository.save(newCustomer);
                });
    
        Orderr createOrder = new Orderr();
        createOrder.setStaff(user);
        createOrder.setCreatedAt(new Date());
        createOrder.setOrderStatus("PENDING");
        createOrder.setArea(area);
        createOrder.setCustomer(customer);
    
        Cart cart = cartService.findCartByUserId(user.getId());
    
        List<OrderItem> orderItems = new ArrayList<>();
    
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setJewelry(cartItem.getJewelry());
            orderItem.setComponents(cartItem.getComponents());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getDiscountedPrice()); // Sử dụng giá đã giảm
    
            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }
    
        double totalPrice = cartService.calculateCartTotals(cart);
    
        createOrder.setItems(orderItems);
        createOrder.setTotalPrice(totalPrice);
    
        Orderr savedOrder = orderRepository.save(createOrder);
        area.getOrders().add(savedOrder);
    
        return createOrder;
    }


    @Override
    public Orderr updatOrder(Long orderId, String orderStatus) throws Exception {
        Orderr order = findOrderById(orderId);
        if ("COMPLETE".equals(orderStatus) || "PENDING".equals(orderStatus)) {
            order.setOrderStatus(orderStatus);
            Orderr updatedOrder = orderRepository.save(order);

            if ("COMPLETE".equals(orderStatus)) {
                Customer customer = order.getCustomer();
                if (customer != null) {
                    int pointsEarned = (int) (order.getTotalPrice() / 10);  // Example: 1 point for every 10 units of total price
                    customer.setPoint(customer.getPoint() + pointsEarned);
                    customerRepository.save(customer);
                }
            }

            return updatedOrder;
        }
        throw new Exception("Please select a valid order status");
    }

    @Override
    public void cancelOder(Long orderId) throws Exception {
        Orderr order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Orderr> getUserOrder(Long userId) throws Exception {
        return orderRepository.findByStaffId(userId);
    }

    @Override
    public List<Orderr> getAreaOrder(Long areaId, String orderStatus) throws Exception {
        List<Orderr> orders = orderRepository.findByAreaId(areaId);
        if (orderStatus != null) {
            orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
        }
        return orders;
    }

    @Override
    public Orderr findOrderById(Long orderId) throws Exception {
        Optional<Orderr> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty()) {
            throw new Exception("Order not found");
        }
        return optionalOrder.get();
    }

}