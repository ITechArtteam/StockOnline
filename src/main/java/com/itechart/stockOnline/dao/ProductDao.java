package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductDao extends JpaRepository<Product, Integer>, JpaSpecificationExecutor {
}
