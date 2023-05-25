package com.example.order.repository;

import com.example.order.domain.ProductIncluded;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductIncludedRepository extends JpaRepository<ProductIncluded, String> {
}
