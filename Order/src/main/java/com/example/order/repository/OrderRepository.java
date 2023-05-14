package com.example.order.repository;


import com.example.order.domain.Order;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface OrderRepository extends ReactiveCrudRepository<Order, String> {
    Mono<Order> findById(String id);
    Mono<Order> deleteOrderById(String id);
    Mono<Order> updateById(Order newValue);
}
