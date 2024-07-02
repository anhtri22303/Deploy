package com.jewelry_store.jewelry_store.service.Buyback;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Area;
import com.jewelry_store.jewelry_store.model.Buyback;
import com.jewelry_store.jewelry_store.model.Customer;
import com.jewelry_store.jewelry_store.model.Jewelry;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.repository.BuybackRepository;
import com.jewelry_store.jewelry_store.repository.CustomerRepository;
import com.jewelry_store.jewelry_store.repository.JewelryRepository;
import com.jewelry_store.jewelry_store.request.BuybackRequest;
import com.jewelry_store.jewelry_store.request.CreateJewelryRequest;
import com.jewelry_store.jewelry_store.service.Area.AreaService;
import com.jewelry_store.jewelry_store.service.Jewelry.JewelryService;

@Service
public class BuybackServiceImpl implements BuybackService {

    @Autowired
    private BuybackRepository buybackRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private JewelryRepository jewelryRepository;

    @Autowired
    private AreaService areaService; 

    @Autowired
    private JewelryService jewelryService;
    

    @Override
    public Buyback createBuyback(BuybackRequest buybackreq,  String jewelryCode,
    User user) throws Exception {
        // Area area = areaService.getAreabyUserId(buybackreq.getStaffId());
        Area area = areaService.getAreabyUserId(user.getId());
        Customer customer = customerRepository.findByFullnameAndMobileAndEmail(
                buybackreq.getFullname(), buybackreq.getMobile(), buybackreq.getEmail())
                .orElseGet(() -> {
                    Customer newCustomer = new Customer();
                    newCustomer.setFullname(buybackreq.getFullname());
                    newCustomer.setMobile(buybackreq.getMobile());
                    newCustomer.setEmail(buybackreq.getEmail());
                    newCustomer.setPoint(0);  // Khởi tạo điểm về 0
                    return customerRepository.save(newCustomer);
                }); 
            Jewelry jewelry;
            Optional<Jewelry> optionalJewelry = jewelryRepository.findByCode(jewelryCode);
            if (!optionalJewelry.isPresent()) {
                throw new Exception("Jewelry not found with code: " + jewelryCode);
            }
             jewelry = optionalJewelry.get();
        
        Buyback buyback = new Buyback();
        double buybackPrice = jewelryService.calculateBuybackPrice(jewelry);
        // tạo mới sản phẩm

            buyback.setJewelry(jewelry);
            buyback.setArea(area);
            buyback.setStaff(user);
            buyback.setCustomer(customer);
            buyback.setBuybackPrice(buybackPrice);
            buyback.setTransactionDate(new Date(System.currentTimeMillis()));
        
        return buybackRepository.save(buyback);
        
                
}

            @Override
            public Buyback createBuybackOut(BuybackRequest buybackreq,  CreateJewelryRequest newJewelryRequest,
            User user) throws Exception {
                Area area = areaService.getAreabyUserId(user.getId());
                Customer customer = customerRepository.findByFullnameAndMobileAndEmail(
                        buybackreq.getFullname(), buybackreq.getMobile(), buybackreq.getEmail())
                        .orElseGet(() -> {
                            Customer newCustomer = new Customer();
                            newCustomer.setFullname(buybackreq.getFullname());
                            newCustomer.setMobile(buybackreq.getMobile());
                            newCustomer.setEmail(buybackreq.getEmail());
                            newCustomer.setPoint(0);  // Khởi tạo điểm về 0
                            return customerRepository.save(newCustomer);
                        }); 
                        Jewelry jewelry;
                
                    jewelry = jewelryService.createJewelry(newJewelryRequest);
                  
                Buyback buyback = new Buyback();
                double buybackPrice = jewelryService.calculateBuybackPrice(jewelry);
                // tạo mới sản phẩm
        
                    buyback.setJewelry(jewelry);
                    buyback.setArea(area);
                    buyback.setStaff(user);
                    buyback.setCustomer(customer);
                    buyback.setBuybackPrice(buybackPrice);
                    buyback.setTransactionDate(new Date(System.currentTimeMillis()));
        
                return buybackRepository.save(buyback);
                        
                        
                    }

    @Override
    public Optional<Buyback> getBuybackById(Long id) {
        return buybackRepository.findById(id);
    }

    @Override
    public List<Buyback> getAllBuybacks() {
        return buybackRepository.findAll();
     }

    // @Override
    // public Buyback updateBuyback(Long id, Buyback buybackDetails, Long customerId) throws Exception {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'updateBuyback'");
    // }

    @Override
    public void deleteBuyback(Long id) {
        buybackRepository.deleteById(id);
       }
}
