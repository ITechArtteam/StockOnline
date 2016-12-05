package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.ClientCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientCompanyDao extends JpaRepository<ClientCompany, Long> {
    ClientCompany findById(Long id);
}
