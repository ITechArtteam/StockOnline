package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.ProductOnShelf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductOnShelfDao extends JpaRepository<ProductOnShelf, Integer>, JpaSpecificationExecutor{
}
