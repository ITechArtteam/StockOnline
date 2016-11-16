package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface StockDao extends JpaRepository<Stock, Long> {
    Optional<Stock> findById(Integer id);
    Page<Stock> findAll(Pageable pageable);
    @Transactional
    void deleteByIdIn(Collection<Integer> ids);
}