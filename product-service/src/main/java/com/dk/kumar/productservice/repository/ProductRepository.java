package com.dk.kumar.productservice.repository;

import com.dk.kumar.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
