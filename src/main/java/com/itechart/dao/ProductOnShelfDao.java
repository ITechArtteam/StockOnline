package com.itechart.dao;

import com.itechart.model.ProductOnShelf;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductOnShelfDao extends JpaRepository<ProductOnShelf, Long> {
}
