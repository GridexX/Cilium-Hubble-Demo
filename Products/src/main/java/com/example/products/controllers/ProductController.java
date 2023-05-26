package com.example.products.controllers;

import com.example.products.domain.Product;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "*")
@RestController
public class ProductController {

    @Autowired
    ReactiveMongoTemplate template;

    // public Response

    @GetMapping("/products")
    public ResponseEntity< Flux<Product>> getProducts() {
        double random = Math.random();
        if(random < .25) {
            return ResponseEntity.internalServerError().build();
        }
        if(random < .5) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body( template.findAll(Product.class) );
    }


    @GetMapping("/products/{id}")
    public ResponseEntity< Mono<Product>> findByIndex(@PathVariable("id") String id) {
        double random = Math.random();
        if(random < .25) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(template.findById(id, Product.class));
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
