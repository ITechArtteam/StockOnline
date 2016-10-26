package com.itechart.dao;

import com.itechart.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverDao extends JpaRepository<Driver, Long> {
}
