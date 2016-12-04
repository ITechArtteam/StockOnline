package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Act;
import com.itechart.stockOnline.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> update(List<Product> products);

    List<Product> getAll();

    Product get(Long id);

    void delete(Long id);

    Product save(Product product);

    List<Product> save(List<Product> products);

    void delete(Long[] ids);
}
