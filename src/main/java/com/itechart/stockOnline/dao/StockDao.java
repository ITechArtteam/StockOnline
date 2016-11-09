package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockDao extends JpaRepository<Stock, Long> {
    Optional<Stock> findByName(String name);
    Page<Stock> findAll(Pageable pageable);
}