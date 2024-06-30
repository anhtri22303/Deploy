package com.jewelry_store.jewelry_store.service.Component;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Component;
import com.jewelry_store.jewelry_store.repository.ComponentRepository;
import com.jewelry_store.jewelry_store.request.ComponentRequest;

@Service
public class ComponentServiceImp implements ComponentService  {

    @Autowired
    private ComponentRepository componentRepository;

    @Override
    public Component createComponent(ComponentRequest req) {
        Component component = new Component();
        component.setName(req.getName());
        component.setPrice(req.getPrice());
        component.setPricebuyback(req.getPricebuyback());

        return componentRepository.save(component);
    }

    @Override
    public Optional<Component> findById(Long id) {
        return componentRepository.findById(id);
    }

    @Override
    public Optional<Component> findByName(String name) {
       return componentRepository.findByName(name);
    }

    @Override
    public Optional<Component> updateComponent(Long id, ComponentRequest req) {
    Optional<Component> optionalComponent = componentRepository.findById(id);
        if (optionalComponent.isPresent()) {
            Component component = optionalComponent.get();
            // component.setName(req.getName());
            component.setPrice(req.getPrice());
            component.setPricebuyback(req.getPricebuyback());
            return Optional.of(componentRepository.save(component));
        } 
        return Optional.empty();
    }

    @Override
    public boolean deleteComponent(Long id) {
        if (componentRepository.existsById(id)) {
            componentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Component> findAll() {
        return componentRepository.findAll();
    }

    @Override
    public List<Component> findByIds(List<Long> ids) {
        return componentRepository.findAllById(ids);
    }

}
