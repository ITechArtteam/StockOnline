package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.ClientCompany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientDao extends JpaRepository<ClientCompany, Long> {
    Optional<ClientCompany> findByName(String name);
    Page<ClientCompany> findAll(Pageable pageable);
}
