package com.itechart.dao;

import com.itechart.model.StockOwnerCompany;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StockOwnerCompanyDao extends JpaRepository<StockOwnerCompany, Long> {
}
