package com.example.order.repository;

import com.example.order.domain.ProductIncluded;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProductIncludedRepository extends ReactiveCrudRepository<ProductIncluded, String> {
}
