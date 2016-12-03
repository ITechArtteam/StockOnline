package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.TransferCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferCompanyDao extends JpaRepository<TransferCompany, Long>{
    TransferCompany findByName(String name);

    TransferCompany findByDriversId(Long id);
}
