package com.example.controller;

import com.example.order.domain.*;
import com.example.order.repository.OrderRepository;
import com.example.order.repository.ProductIncludedRepository;
import com.example.order.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;


@RestController
public class OrderController {
	@Autowired
	private ProductIncludedRepository productIncludedRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ProductService productService;

	@PostMapping("/orders")
	private Flux<Order> addOne(@RequestBody() OrderDTO orderDTO) {
		Flux<ProductIncludedDTO> productIncluded = Mono.just(
			orderDTO.getProductsIncluded()
		).flatMapMany(Flux::fromIterable);

		Flux<Product> productDetails = productIncluded.flatMap(p ->
			productService.insertOneIntoDB(p.getProductId())
		);

		String uuid = String.valueOf(UUID.randomUUID());

		return Flux.zip(productDetails, productIncluded)
			.flatMap(tuple ->
				productIncludedRepository.save(
					new ProductIncluded(
						new ProductIncludedKey(
							tuple.getT1().getId(),
							uuid
						),
						tuple.getT1(),
						new Order(
							uuid,
							orderDTO.getClientName(),
							tuple.getT1().getPrice() * tuple.getT2().getQuantity(),
							List.of()
						),
						tuple.getT2().getQuantity()
					)
				)
			).map(ProductIncluded::getOrder);
	}

	@GetMapping("/orders/{id}")
	private Mono<Order> findOrderById(@PathVariable("id") String id) {
		return orderRepository.findById(id);
	}

}
