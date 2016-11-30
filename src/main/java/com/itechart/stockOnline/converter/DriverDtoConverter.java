package com.itechart.stockOnline.converter;

import com.itechart.stockOnline.model.Driver;
import com.itechart.stockOnline.model.TransferCompany;
import com.itechart.stockOnline.model.dto.DriverDto;

public class DriverDtoConverter {
    public Driver toDriver(DriverDto driverDto){

        Driver driver = new Driver();
        driver.setId(driverDto.getId());
        driver.setFirstName(driverDto.getFirstName());
        driver.setLastName(driverDto.getLastName());
        driver.setPatronymic(driverDto.getPatronymic());
        //driver.setBirthDate();
        driver.setPassportNumber(driverDto.getPassportNumber());
        driver.setPassportIssuedBy(driverDto.getPassportIssuedBy());
        //driver.setPassportIssuedDate();

        //Пока так, потом нужно будет сначала найти из базы
        driver.setCompany(new TransferCompany(driverDto.getTransferCompany()));
        return driver;
    }
}
