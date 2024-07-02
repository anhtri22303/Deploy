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
import com.jewelry_store.jewelry_store.model.Warranty;
import com.jewelry_store.jewelry_store.repository.CustomerRepository;
import com.jewelry_store.jewelry_store.repository.OrderItemRepository;
import com.jewelry_store.jewelry_store.repository.OrderRepository;
import com.jewelry_store.jewelry_store.repository.UserRepository;
import com.jewelry_store.jewelry_store.repository.WarrantyRepository;
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

    @Autowired 
    private WarrantyRepository warrantyRepository;


    @Override
    public Orderr createOrder(OrderRequest orderRequest, User user) throws Exception {
        // Lấy thông tin vùng miền của người dùng
        Area area = areaService.getAreabyUserId(user.getId());
    
        // Tìm hoặc tạo mới thông tin khách hàng
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
    
        // Tạo đối tượng Order mới
        Orderr createOrder = new Orderr();
        createOrder.setStaff(user);
        createOrder.setCreatedAt(new Date());
        createOrder.setOrderStatus("PENDING");
        createOrder.setArea(area);
        createOrder.setCustomer(customer);
    
        // Lấy giỏ hàng của người dùng và lưu các mục đơn hàng
        Cart cart = cartService.findCartByUserId(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setJewelry(cartItem.getJewelry());
            orderItem.setComponents(cartItem.getComponents());
            orderItem.setQuantity(cartItem.getQuantity());
            if(cartItem.getDiscountedPrice()==0){
            orderItem.setTotalPrice(cart.getTotal());
            } else {
            orderItem.setTotalPrice(cartItem.getDiscountedPrice()); // Sử dụng giá đã giảm
            }
            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }
    
        // Tính tổng giá trị của đơn hàng
        double totalPrice = cartService.calculateCartTotals(cart);
        
        // Tạo và lưu đối tượng Warranty vào cơ sở dữ liệu trước khi liên kết với Orderr
        Warranty warranty = new Warranty();
        warranty.setOrder(createOrder);
        warranty.calculateWarrantyPeriod(totalPrice); // Tính toán thời gian bảo hành dựa trên tổng giá trị
        warranty.setTerms("nothing");
        warranty = warrantyRepository.save(warranty); // Lưu Warranty vào cơ sở dữ liệu
    
        // Thiết lập các mục đơn hàng và tổng giá trị vào đơn hàng
        createOrder.setItems(orderItems);
        createOrder.setTotalAmount(cart.getTotal()); // giá trước giảm giá
        createOrder.setTotalPrice(totalPrice);
        createOrder.setWarranty(warranty); // Liên kết đối tượng Warranty đã lưu với Orderr
    
        // Lưu đơn hàng vào cơ sở dữ liệu
        Orderr savedOrder = orderRepository.save(createOrder);
        area.getOrders().add(savedOrder);
    
        return savedOrder;
    }
    

    @Override
    @Transactional
    public Orderr updatOrder(Long orderId, String orderStatus) throws Exception {
        Orderr order = findOrderById(orderId);
        if ("COMPLETED".equals(orderStatus) || "PENDING".equals(orderStatus)) {
            order.setOrderStatus(orderStatus);
            Orderr updatedOrder = orderRepository.save(order);
    
            if ("COMPLETED".equals(orderStatus)) {
                Customer customer = order.getCustomer();
                if (customer != null) {
                    int pointsEarned = (int) (order.getTotalPrice() / 10);
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


    @Override
    public List<Orderr> getAllOrder() throws Exception {
        return orderRepository.findAll();    
    }

}