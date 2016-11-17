package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.StockOwnerCompany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface StockOwnerCompanyDao extends JpaRepository<StockOwnerCompany, Long> {
    Optional<StockOwnerCompany> findByName(String name);
    Optional<StockOwnerCompany> findById(Integer id);
    Page<StockOwnerCompany> findAll(Pageable pageable);

    @Modifying
    @Query("delete from StockOwnerCompany s where s.name in ?1")
    int deleteByNameIn(Collection<String> names);
}
