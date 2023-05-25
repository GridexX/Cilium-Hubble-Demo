package com.example.order.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class ProductServiceConfig {

	@Bean
	public WebClient webClient(@Value("${spring.productservice.url}") String url) {
		return WebClient.builder()
			.baseUrl(url)
			.defaultHeader("Content-Type", "application/json")
		.build();
	}
}
