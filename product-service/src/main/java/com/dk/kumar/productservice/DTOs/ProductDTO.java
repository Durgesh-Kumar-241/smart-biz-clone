package com.dk.kumar.productservice.DTOs;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String category;
    private String title;
    private String description;
    private Double price;


}
