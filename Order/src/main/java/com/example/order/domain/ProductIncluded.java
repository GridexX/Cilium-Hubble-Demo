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
@ToString(exclude = {"order"})
public class ProductIncluded {

    @EmbeddedId
    @JsonIgnore
    private ProductIncludedKey id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    private Integer quantity;
}

