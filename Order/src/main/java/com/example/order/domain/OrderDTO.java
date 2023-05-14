package com.example.order.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderDTO {

	private Optional<String> id;

	private String clientName;

	private Double totalPrice;

	private List<ProductIncludedDTO> productsIncluded;
}
