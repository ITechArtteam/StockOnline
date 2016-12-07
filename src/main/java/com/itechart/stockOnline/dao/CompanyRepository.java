package com.itechart.stockOnline.dao;


import com.itechart.stockOnline.model.StockOwnerCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<StockOwnerCompany, Long>{
}
