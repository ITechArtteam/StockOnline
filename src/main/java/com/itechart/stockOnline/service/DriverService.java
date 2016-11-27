package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Driver;

public interface DriverService {
    Driver save(Driver driver);
    Driver update(Driver driver);
    Driver findByPassportNumber(String passportNumber);
    void delete(Driver driver);
}
