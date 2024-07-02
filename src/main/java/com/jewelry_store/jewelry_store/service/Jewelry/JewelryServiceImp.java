package com.jewelry_store.jewelry_store.service.Jewelry;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Category;
import com.jewelry_store.jewelry_store.model.Component;
import com.jewelry_store.jewelry_store.model.Jewelry;
import com.jewelry_store.jewelry_store.repository.CategoryRepository;
import com.jewelry_store.jewelry_store.repository.ComponentRepository;
import com.jewelry_store.jewelry_store.repository.JewelryRepository;
import com.jewelry_store.jewelry_store.request.CreateJewelryRequest;

@Service
public class JewelryServiceImp implements JewelryService {

    @Autowired
    private JewelryRepository jewelryRepository;

    @Autowired
    private ComponentRepository componentRepository; 
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Override
    public Jewelry createJewelry(CreateJewelryRequest req) throws Exception {
        Category category = new Category();
        Optional<Category> existingCategoryOpt = categoryRepository.findByName(req.getJewelryCategory());
        if (existingCategoryOpt.isPresent()) {
            category = existingCategoryOpt.get();
        } else {
            // Save the category if it does not exist
            category = new Category();
            category.setName(req.getJewelryCategory());
            category = categoryRepository.save(category);
        }

        Jewelry jewelry = new Jewelry();
        jewelry.setName(req.getName());
        jewelry.setDescription(req.getDescription());
        jewelry.setGoldWeight(req.getGoldWeight());
        jewelry.setDiamondWeight(req.getDiamondWeight());
        jewelry.setJewelryCategory(category);
        jewelry.setImages(req.getImages());
        jewelry.setCode(req.getCode());
        jewelry.setCreationDate(new Date(System.currentTimeMillis()));
        jewelry.setAvailabe(true); // Assuming default availability

        // Save Jewelry first to generate ID for components
        jewelry = jewelryRepository.save(jewelry);

        // Save components
        List<Component> components = new ArrayList<>();
        if (req.getComponents() != null) {
            for (String componentName : req.getComponents()) {
                Optional<Component> componentOpt = componentRepository.findByName(componentName);
                if (componentOpt.isPresent()) {
                    Component component = componentOpt.get();

                    // Thêm jewelry vào danh sách của component
                    component.getJewelryList().add(jewelry);
                    components.add(component);

                    // Không cần lưu lại component ở đây nữa
                } else {
                    throw new Exception("Component not found: " + componentName);
                }
            }
        }

        jewelry.setComponents(components);

        // Calculate and set price
        double totalPrice = calculateJewelryPrice(jewelry);
        jewelry.setPrice(totalPrice);

        // Lưu lại jewelry đã cập nhật giá trị
        return jewelryRepository.save(jewelry);
    }

    @Override
    public void deleteJewelry(Long jewelryid) throws Exception {
        Jewelry jewelry = FindJewelryById(jewelryid);
        jewelryRepository.save(jewelry);
    }

    @Override
    public List<Jewelry> searchJewelry(String keyword) {
        return jewelryRepository.searchJewelry(keyword);    
    }

    public Jewelry updateAvailibityStatus(Long jewelryId) throws Exception {
        Optional<Jewelry> optionalJewelry = jewelryRepository.findById(jewelryId);
        
        if (!optionalJewelry.isPresent()) {
            throw new Exception("Jewelry not found with id: " + jewelryId);
        }
    
        Jewelry jewelry = optionalJewelry.get();
        jewelry.setAvailabe(!jewelry.isAvailabe());
        return jewelryRepository.save(jewelry);
    }

    @Override
    public double calculateJewelryPrice(Jewelry jewelry) {
        double goldWeight = jewelry.getGoldWeight();
        double diamondWeight = jewelry.getDiamondWeight();
        List<Component> components = jewelry.getComponents();

        double goldPrice = 0.0;
        double diamondPrice = 0.0;

        // Assuming components contain prices for gold and diamond
        for (Component component : components) {
            if (component.getName().contains("gold")) {
                if (component.getName().contains("18k")) {
                    goldPrice = component.getPrice();
                } else {
                    goldPrice = component.getPrice();
                }
            } else if (component.getName().contains("diamond")) {
                if (component.getName().contains("natural")) {
                    diamondPrice = component.getPrice();
                } else {
                    diamondPrice = component.getPrice();
                }
            }
        }

        return (goldWeight * goldPrice) + (diamondWeight * diamondPrice);
    }

    @Override
    public void updatePricesFromComponentChanges() {
        List<Jewelry> jewelryList = jewelryRepository.findAll();

        for (Jewelry jewelry : jewelryList) {
            // Tính toán lại giá dựa trên thông tin từ thành phần (component)
            double newPrice = calculateJewelryPrice(jewelry);

            // Cập nhật giá mới
            jewelry.setPrice(newPrice);

            // Lưu lại sản phẩm đã cập nhật
            jewelryRepository.save(jewelry);
        }
    }

    public double calculateBuybackPrice(Jewelry jewelry) {
        double goldWeight = jewelry.getGoldWeight();
        double diamondWeight = jewelry.getDiamondWeight() ;
        List<Component> components = jewelry.getComponents();

        double goldBuybackPrice = 0.0;
        double diamondBuybackPrice = 0.0;

        for (Component component : components) {
            if (component.getName().contains("gold")) {
                goldBuybackPrice = component.getPricebuyback();
            } else if (component.getName().contains("diamond")) {
                diamondBuybackPrice = (component.getPrice()*85)/100;
            }
        }

        return (goldWeight * goldBuybackPrice) + (diamondWeight * diamondBuybackPrice);
    }   

    public double calculateBuybackPriceOut(double goldWeight,double diamondWeight,List<String> componentsName) {
        
        double goldBuybackPrice = 0.0;
    double diamondBuybackPrice = 0.0;

    // Duyệt qua danh sách tên các components
    List<Component> components = componentRepository.findAll(); // Lấy tất cả components từ repository

    for (String componentName : componentsName) {
        Component component = findComponentByName(componentName, components);

        if (component == null) {
            continue;
        }

        if (component.getName().toLowerCase().contains("gold")) {
            goldBuybackPrice = component.getPricebuyback();
        } else if (component.getName().toLowerCase().contains("diamond")) {
            diamondBuybackPrice = (component.getPrice() * 85) / 100;
        }
    }

    return (goldWeight * goldBuybackPrice) + (diamondWeight * diamondBuybackPrice);
}
private Component findComponentByName(String componentName, List<Component> components) {
    for (Component component : components) {
        if (component.getName().equalsIgnoreCase(componentName)) {
            return component;
        }
    }
    return null;
}

    @Override
    public List<Jewelry> getAllJewelry() {
        return jewelryRepository.findAll();
    }

    @Override
    public Jewelry FindJewelryById(Long jewelryId) throws Exception {
        return jewelryRepository.findById(jewelryId)
                .orElseThrow(() -> new Exception("Jewelry not exist"));
    }

    public Jewelry findJewelryByCode(String code) throws Exception {
        return jewelryRepository.findByCode(code)
                .orElseThrow(() -> new Exception("Jewelry not found"));
    }


}

