package com.itechart.dao;

import com.itechart.model.Waybill;
import org.springframework.data.jpa.repository.JpaRepository;


public interface WaybillDao extends JpaRepository<Waybill, Long> {
}
