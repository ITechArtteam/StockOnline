package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.StockOwnerCompany;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockOwnerCompanyDao extends JpaRepository<StockOwnerCompany, Long> {
    Optional<StockOwnerCompany> findByName(String name);
}
