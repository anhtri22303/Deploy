package com.jewelry_store.jewelry_store.service.Component;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Component;
import com.jewelry_store.jewelry_store.request.ComponentRequest;


public interface ComponentService {
    public Component createComponent(ComponentRequest req);
    public Optional<Component> findById(Long id);
    public Optional<Component> findByName(String name);
    public Optional<Component> updateComponent(Long id, ComponentRequest req);
    public boolean deleteComponent(Long id );
    public List<Component> findAll();
    public List<Component> findByIds(List<Long> ids) ;
    
}   
