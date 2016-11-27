package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.DriverDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Driver;
import com.itechart.stockOnline.validator.DriverValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DriverServiceImpl implements DriverService {

    private static final Logger logger = LoggerFactory.getLogger(DriverServiceImpl.class);

    private final DriverDao driverDao;

    private final DriverValidator driverValidator;

    @Autowired
    public DriverServiceImpl(DriverDao driverDao, DriverValidator driverValidator) {
        this.driverDao = driverDao;
        this.driverValidator = driverValidator;
    }

    @Override
    public Driver save(Driver driver) {
        return null;
    }

    @Override
    public Driver update(Driver driver) {
        return null;
    }

    @Override
    public Driver findByPassportNumber(String passportNumber) {
        Map<String, String> errors = driverValidator.checkPassportNumber(passportNumber);
        if (errors.size() > 0){
            throw new ValidationError(errors);
        }
        Driver driver = driverDao.findByPassportNumber(passportNumber);
        logger.debug("findByPassportNumber({}): {}", passportNumber, driver);
        if (driver == null){
            throw new DataNotFoundError("Водитель с таким паспортом не зарегистрирован.");
        }
        return driver;
    }

    @Override
    public void delete(Driver driver) {

    }
}
