package com.example.order.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "product_included")
@ToString(exclude = {"order"})
public class ProductIncluded {

    @EmbeddedId
    private ProductIncludedKey id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Product product;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    private Integer quantity;
}

