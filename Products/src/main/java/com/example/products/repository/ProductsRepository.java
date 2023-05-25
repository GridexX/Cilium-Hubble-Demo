package com.example.products.repository;

import com.example.products.domain.Product;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface ProductsRepository extends ReactiveMongoRepository<Product, String> {

    Mono<Product> findById(String id);

    // Mono<Product> updateById(Product newValue);

    Mono<Product> deleteProductById(String id);
}
