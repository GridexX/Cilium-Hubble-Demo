package com.example.products.controllers;

import com.example.products.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
public class ProductController {

    @Autowired
    ReactiveMongoTemplate template;


    @GetMapping("/products/{id}")
    public Mono<Product> findByIndex(@PathVariable("id") String id) {
        return template.findById(id, Product.class);
    }

    @DeleteMapping("/products/{id}")
    public Mono<Product> deleteById(@PathVariable("id") String id) {
        return template.remove(template.findById(id, Product.class)).then(Mono.just(new Product()));
    }

    @PostMapping("/products")
    public Mono<Product> create(@RequestBody Product product) {
        return template.insert(product);
    }

    @PutMapping("/products")
    public Mono<Product> upsert(@RequestBody Product product) {
        return template.save(product);
    }
}
