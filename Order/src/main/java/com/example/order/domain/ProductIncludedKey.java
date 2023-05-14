package com.example.order.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Embeddable
public class ProductIncludedKey implements Serializable {

    @Column(name = "product_id")
    private String productId;

    @Column(name = "order_id")
    private String orderId;

}
