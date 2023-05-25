package com.example.order.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Table(name = "product")
public class Product extends ProductDTO {
    @Id
    @Column
    protected String id;

    @Column
    protected Double price;


    @JsonIgnore
    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    private List<ProductIncluded> orders;


    public static Product from (ProductDTO dto) {
        return new Product(dto.getId(), dto.getPrice(), new ArrayList<>());
    }
}
