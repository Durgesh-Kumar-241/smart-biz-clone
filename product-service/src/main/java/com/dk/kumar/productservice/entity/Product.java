package com.dk.kumar.productservice.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> imageUrl;
    private String title;
    private String description;
    private float rating;
    private float discountPercent;
    private int totalReviews;
    private Double price;
    private Double originalPrice;
    private String category;
}

