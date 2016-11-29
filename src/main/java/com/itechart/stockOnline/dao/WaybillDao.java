package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Waybill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WaybillDao extends JpaRepository<Waybill, Long>, JpaSpecificationExecutor {
}
