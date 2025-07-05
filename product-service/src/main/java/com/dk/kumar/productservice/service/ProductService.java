package com.dk.kumar.productservice.service;

import com.dk.kumar.productservice.DTOs.ProductDTO;
import com.dk.kumar.productservice.entity.Product;
import com.dk.kumar.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;

    private final String uploadDir = "uploads/";

    public Product addProduct(ProductDTO dto, List<MultipartFile> images) {
        List<String> imageUrl = saveImages(images);
        Product product = mapDtoToEntity(dto);
        product.setImageUrl(imageUrl);
        return productRepo.save(product);
    }

    public Product updateProduct(Long id, ProductDTO dto, List<MultipartFile> images) {
        Product product = productRepo.findById(id).orElseThrow();
        List<String> imageUrl = saveImages(images);
        product.setImageUrl(imageUrl);
        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setPrice(dto.getPrice());
        return productRepo.save(product);
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    public List<Product> getAll() {
        return productRepo.findAll();
    }

    public Product getById(Long id) {
        return productRepo.findById(id).orElseThrow();
    }



    private Product mapDtoToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setCategory(dto.getCategory());
        return product;
    }

    private List<String> saveImages(List<MultipartFile> images) {
        if (images == null || images.isEmpty()) return Collections.emptyList();
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : images) {
            try {
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path path = Paths.get(uploadDir, filename);
                Files.createDirectories(path.getParent());
                Files.write(path, file.getBytes());
                urls.add("/images/" + filename); // Assuming mapped via WebMvcConfigurer
            } catch (IOException e) {
                throw new RuntimeException("Image upload failed", e);
            }
        }

        return urls;
    }

}

