package com.jewelry_store.jewelry_store.service.Category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Category;
import com.jewelry_store.jewelry_store.repository.CategoryRepository;

import jakarta.el.ELException;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Category name) throws Exception {
      Category category = new Category();
      category.setName(name.getName());

      return categoryRepository.save(category);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {
    Optional<Category> optionalCategory = categoryRepository.findById(id);

    if(optionalCategory.isEmpty()){
        throw new ELException("category not found");
    }

    return optionalCategory.get();
    }

    @Override
    public Category findCategoryByName(Category name) throws Exception {
        Optional<Category> optionalCategory = categoryRepository.findByName(name.getName());

        if (optionalCategory.isEmpty()) {
            throw new ELException("Category with name " + name + " not found");
        }

        return optionalCategory.get();
    }

    @Override
    public List<Category> getAllCategories() throws Exception {
        return categoryRepository.findAll();
    }

    }


