package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.DriverDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Driver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverServiceImpl implements DriverService {

    private static final Logger logger = LoggerFactory.getLogger(DriverServiceImpl.class);

    private final DriverDao driverDao;

    @Autowired
    public DriverServiceImpl(DriverDao driverDao) {
        this.driverDao = driverDao;
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
