package com.itechart.dao;

import com.itechart.model.ClientCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientCompanyDao  extends JpaRepository<ClientCompany, Long> {
}
