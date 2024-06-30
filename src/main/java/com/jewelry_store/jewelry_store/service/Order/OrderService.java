package com.jewelry_store.jewelry_store.service.Order;

import java.util.List;

import com.jewelry_store.jewelry_store.model.Orderr;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.request.OrderRequest;

public interface OrderService {
    public Orderr createOrder(OrderRequest order, User user) throws Exception;

    public Orderr updatOrder(Long orderId, String orderStatus) throws Exception;
    
    public void cancelOder(Long orderId) throws Exception;

    public List<Orderr> getUserOrder(Long userId) throws Exception;

    public List<Orderr> getAreaOrder(Long areaId, String orderStatus) throws Exception;

    public Orderr findOrderById (Long orderId) throws Exception;
}
