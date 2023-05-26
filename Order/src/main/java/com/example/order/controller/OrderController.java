package com.example.order.controller;

import com.example.order.domain.*;
import com.example.order.repository.OrderRepository;
import com.example.order.repository.ProductIncludedRepository;
import com.example.order.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
public class OrderController {

	private Logger logger = LoggerFactory.getLogger(OrderController.class);

	@Autowired
	private ProductIncludedRepository productIncludedRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ProductService productService;

	@PostMapping("/orders")
	private Mono<Order> addOne(@RequestBody() OrderDTO orderDTO) {
		Flux<ProductIncludedDTO> productIncluded = Mono.just(
			orderDTO.getProductsIncluded()
		).flatMapMany(Flux::fromIterable);

		Flux<Product> productDetails = productIncluded.flatMap(p ->
			productService.insertOneIntoDB(p.getProductId())
		);

		String uuid = String.valueOf(UUID.randomUUID());

		logger.info("Creating order id: " + uuid);

		return Flux.zip(productDetails, productIncluded)
			.publishOn(Schedulers.boundedElastic())
			.doFirst(() -> {
					Order saved = orderRepository.save(new Order(
						uuid,
						orderDTO.getClientName(),
						LocalDateTime.now(),
						ProductService.generateRandomStatus(),
						List.of()
					));

					logger.info("Order saved: " + saved);

			})
			.map(tuple -> {
				logger.info("Creating productIncluded: " + tuple);
				return productIncludedRepository.save(
					new ProductIncluded(
						new ProductIncludedKey(
							tuple.getT1().getId(),
							uuid
						),
						tuple.getT1(),
						new Order(
							uuid,
							orderDTO.getClientName(),
							LocalDateTime.now(),
							ProductService.generateRandomStatus(),
							List.of()
						),
						tuple.getT2().getQuantity()
					)
				);
			}).last().map(ProductIncluded::getOrder);
	}

	@GetMapping("/orders/{id}")
	private Optional<Order> findOrderById(@PathVariable("id") String id) {
		return orderRepository.findById(id);
	}

	@GetMapping("/orders")
	private ResponseEntity<List<Order>> findManyOrders(@RequestParam(value = "limit", defaultValue = "10") Integer limit, @RequestParam(value = "page", defaultValue = "1") Integer page) {
		double random = Math.random();
        if(random < .25) {
            return ResponseEntity.internalServerError().build();
        }
        if(random < .5) {
            return ResponseEntity.badRequest().build();
        }
		return ResponseEntity.ok().body(orderRepository.findAll());
	}

}
