package com.itechart.dao;

import com.itechart.model.TransferCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferCompanyDao extends JpaRepository<TransferCompany, Long> {
}
