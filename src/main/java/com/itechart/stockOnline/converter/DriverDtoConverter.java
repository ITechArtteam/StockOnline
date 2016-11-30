package com.itechart.stockOnline.converter;

import com.itechart.stockOnline.model.Driver;
import com.itechart.stockOnline.model.TransferCompany;
import com.itechart.stockOnline.model.dto.DriverDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@Component
public class DriverDtoConverter {

    private static final Logger logger = LoggerFactory.getLogger(DriverDtoConverter.class);

    public Driver toDriver(DriverDto driverDto){

        Driver driver = new Driver();
        driver.setId(driverDto.getId());
        driver.setFirstName(driverDto.getFirstName());
        driver.setLastName(driverDto.getLastName());
        driver.setPatronymic(driverDto.getFatherName());
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {

            Date date = formatter.parse(driverDto.getBirthDate());
            driver.setBirthDate(date);

            Date date1 = formatter.parse(driverDto.getPassportIssuedDate());
            driver.setPassportIssuedDate(date1);

            logger.debug("toDriver: BirthDate: {}, PassportIssuedDate: {}", date, date1);

        } catch (ParseException e) {
            e.printStackTrace();
        }
        driver.setPassportNumber(driverDto.getPassportNumber());
        driver.setPassportIssuedBy(driverDto.getPassportIssuedBy());

        return driver;
    }
}
