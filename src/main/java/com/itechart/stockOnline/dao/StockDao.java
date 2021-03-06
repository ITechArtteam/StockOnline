package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.StockOwnerCompany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface StockDao extends JpaRepository<Stock, Long>, JpaSpecificationExecutor {
    Optional<Stock> findById(Integer id);
    Page<Stock> findAll(Pageable pageable);

    @Modifying
    @Query("delete from Stock s where s.id in ?1")
    int deleteByIdIn(Collection<Long> ids);

    @Query("select s from Stock s where s.id in ?1")
    Stream<Stock> findAllByIdIn(Collection<Integer> ids);

    List<Stock> findAllByCompanyId(Long companyId);
}