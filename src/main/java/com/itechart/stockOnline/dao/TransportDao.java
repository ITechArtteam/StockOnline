package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Transport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportDao extends JpaRepository<Transport, Long> {
}
