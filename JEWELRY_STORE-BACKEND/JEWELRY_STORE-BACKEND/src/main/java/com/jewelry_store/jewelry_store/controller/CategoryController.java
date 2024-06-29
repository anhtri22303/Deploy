package com.jewelry_store.jewelry_store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry_store.jewelry_store.model.Category;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.service.Category.CategoryService;
import com.jewelry_store.jewelry_store.service.User.UserService;

@RestController
@RequestMapping("/api/admin/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Category> createCategory(@RequestBody Category name,
                                                     @RequestHeader("Authorization") String jwt) throws Exception{
    
            User user = userService.findUserByJwtToken(jwt);
            Category createdCategory = categoryService.createCategory(name);
            return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);      
           
    }
       @GetMapping("/{id}")
    public ResponseEntity<Category> findCategoryById(@PathVariable("id") Long id,
                                                     @RequestHeader("Authorization") String jwt) 
                                                     throws Exception {

            User user = userService.findUserByJwtToken(jwt);
            Category foundCategory = categoryService.findCategoryById(id);
            return ResponseEntity.ok(foundCategory);
       
    }

    @GetMapping("/findByName")
    public ResponseEntity<Category> findCategoryByName(@RequestBody Category name,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {
            User user = userService.findUserByJwtToken(jwt);
            Category foundCategory = categoryService.findCategoryByName(name);
            return ResponseEntity.ok(foundCategory);
       
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getAllCategories(
            @RequestHeader("Authorization") String jwt) throws Exception {

        // Validate user based on JWT token
        User user = userService.findUserByJwtToken(jwt);
        
        // Get all categories
        List<Category> categories = categoryService.getAllCategories();

        return ResponseEntity.ok(categories);
    }
    }

