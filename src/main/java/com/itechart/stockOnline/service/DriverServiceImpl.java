package com.itechart.stockOnline.service;


import com.itechart.stockOnline.converter.DriverDtoConverter;
import com.itechart.stockOnline.dao.DriverDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Driver;
import com.itechart.stockOnline.model.TransferCompany;
import com.itechart.stockOnline.model.dto.DriverDto;
import com.itechart.stockOnline.validator.DriverValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class DriverServiceImpl implements DriverService {

    private static final Logger logger = LoggerFactory.getLogger(DriverServiceImpl.class);

    private final DriverDao driverDao;

    private final DriverValidator driverValidator;

    private final DriverDtoConverter driverDtoConverter;

    @Autowired
    private TransferCompanyService transferCompanyService;

    @Autowired
    public DriverServiceImpl(DriverDao driverDao, DriverValidator driverValidator,  DriverDtoConverter driverDtoConverter) {
        this.driverDao = driverDao;
        this.driverValidator = driverValidator;
        this.driverDtoConverter = driverDtoConverter;
    }

    @Override
    public Driver save(Driver driver) {
        driver.setId(null);
        logger.debug("SAVE_DRIVER: driver - {}", driver);
        return driverDao.save(driver);
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

    @Override
    @Transactional
    public Driver saveOrUpdateDriver(DriverDto driverDto) {
        Driver driver = driverDtoConverter.toDriver(driverDto);
        try{
            TransferCompany transferCompany = transferCompanyService.findByName(driverDto.getTransferCompany());
            driver.setCompany(transferCompany);
        }catch(DataNotFoundError e){
            driver.setCompany(new TransferCompany(driverDto.getTransferCompany()));
        }

        logger.debug("saveOrUpdateDriver({}), !!!! driver - {}", driverDto,driver);
        if (driver.getId() > -1){
            driver = update(driver);
        } else {
            driver = save(driver);
        }
        return driver;
    }
}
