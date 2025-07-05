package com.dk.kumar.productservice.controller;

import com.dk.kumar.productservice.DTOs.ProductDTO;
import com.dk.kumar.productservice.entity.Product;
import com.dk.kumar.productservice.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

   // @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> debug(@RequestHeader HttpHeaders headers,
//                                   @RequestParam Map<String, String> params,
//                                   @RequestParam(value = "images", required = false) List<MultipartFile> images) {
//        System.out.println(headers);
//
//        System.out.println("Params: " + params);
//        for (MultipartFile img : images) {
//            System.out.println("Image: " + img.getOriginalFilename() + " (" + img.getSize() + " bytes)");
//        }
//
//        //System.out.println(productDTO);
//        return ResponseEntity.ok().build();
//    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> addProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        //productService.addProduct(productDTO, images)

        try {
            // Convert JSON string to Product object using ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();
            ProductDTO product = objectMapper.readValue(productJson, ProductDTO.class);

            // Now product and images are ready to be processed/saved
            productService.addProduct(product, images);

            return ResponseEntity.ok(productService.addProduct(product, images));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return ResponseEntity.ok(productService.updateProduct(id, productDTO, images));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }
}
