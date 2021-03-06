package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Driver;
import com.itechart.stockOnline.model.dto.DriverDto;

public interface DriverService {
    Driver save(Driver driver);
    Driver update(Driver driver);
    Driver findByPassportNumber(String passportNumber);
    void delete(Driver driver);
    Driver saveOrUpdateDriver(DriverDto driverDto);
}
