package com.example.order.services;

import com.example.order.domain.Product;
import com.example.order.domain.ProductDTO;
import com.example.order.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private WebClient webClient;

	public Mono<ProductDTO> findOneById(String id) {
		return this.webClient.get().uri("/products/" + id)
			.retrieve()
			.bodyToMono(
				ProductDTO.class
			);
	}

	public Mono<Product> insertOneIntoDB(String id) {
		return this.findOneById(id).flatMap(dto ->
			productRepository.save(Product.from(dto))
		);
	}
}
