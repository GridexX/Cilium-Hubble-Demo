package com.example.order.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Table(name = "order_entry")
public class Order {
    @Id
    @Column()
    private String Id;

    @Column()
    private String clientName;

    @Column(name = "date", columnDefinition = "TIMESTAMP")
    private LocalDateTime date;

    @Column()
    private String status;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "order")
    private List<ProductIncluded> productsIncluded;
}

