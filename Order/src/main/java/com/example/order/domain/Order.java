package com.example.order.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Table(name = "order")
public class Order {
    @Id
    @UuidGenerator
    @Column()
    private String Id;

    @Column()
    private String clientName;

    @Column()
    private Double totalPrice;

    @OneToMany(mappedBy = "order")
    private List<ProductIncluded> productsIncluded;
}
