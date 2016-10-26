package com.itechart.dao;

import com.itechart.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StockDao extends JpaRepository<Stock, Long> {
}
