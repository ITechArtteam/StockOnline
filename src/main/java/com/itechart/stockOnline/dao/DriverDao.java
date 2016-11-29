package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverDao extends JpaRepository<Driver, Long>{
    Driver findByPassportNumber(String passportNumber);
}
