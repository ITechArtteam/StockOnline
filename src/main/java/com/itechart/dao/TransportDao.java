package com.itechart.dao;

import com.itechart.model.Transport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportDao extends JpaRepository<Transport, Long> {
}
