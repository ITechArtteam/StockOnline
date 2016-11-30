package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Driver;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.model.dto.DriverDto;
import com.itechart.stockOnline.service.DriverService;
import com.itechart.stockOnline.util.ControllerHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/registrationOfGoods")
public class DriverController {

    private static final Logger logger = LoggerFactory.getLogger(DriverController.class);

    @Autowired
    private DriverService driverService;

    @RequestMapping(value = "/{passportNumber}", method = RequestMethod.GET)
    public Driver getDriverData(@PathVariable String passportNumber){
        passportNumber = ControllerHelper.convertToUtf(passportNumber);
        logger.debug("REST request. Path:/registrationOfGoods/{}  method: GET", passportNumber);
        return driverService.findByPassportNumber(passportNumber);
    }

    @RequestMapping(value = "/editDriver", method = RequestMethod.POST)
    public ResponseEntity<Object> addDriver(@RequestBody DriverDto driverDto){
        logger.debug("REST request. Path:/editDriver/  method: POST Request body {}", driverDto);
        Driver driver = driverService.saveOrUpdateDriver(driverDto);
        return new ResponseEntity<>(driver.getId(), new HttpHeaders(), HttpStatus.OK);
    }



    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> dataNotFound(DataNotFoundError error){
        logger.error("dataNotFound({})", error.getMessage());
        return new ResponseEntity<>(
                error.getMessage() , new HttpHeaders(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = ValidationError.class)
    public ResponseEntity<Object> fieldHasErrors(ValidationError error){
        logger.error("fieldHasErrors({})", error.toString());
        return new ResponseEntity<>(
                error.getErrors(), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


}
