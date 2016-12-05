package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.ProductInWaybill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaybillProductDao extends JpaRepository<ProductInWaybill, Long> {
}
