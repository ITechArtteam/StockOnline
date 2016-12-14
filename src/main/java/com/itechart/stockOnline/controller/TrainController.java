package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.TransferCompany;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.service.TransferCompanyService;
import com.itechart.stockOnline.util.ControllerHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/registrationOfGoods/train")
public class TrainController {

    private static final Logger logger = LoggerFactory.getLogger(TrainController.class);

    @Autowired
    private TransferCompanyService driverService;

    @RequestMapping(value = "/{transferCompanyName}", method = RequestMethod.GET)
    public TransferCompany getDriverData(@PathVariable String transferCompanyName){
        transferCompanyName = ControllerHelper.convertToUtf(transferCompanyName);
        logger.debug("REST request. Path:/registrationOfGoods/train/{}  method: GET", transferCompanyName);
        return driverService.findByName(transferCompanyName);
    }

    @RequestMapping(value = "add/{transferCompanyName}", method = RequestMethod.POST)
    public TransferCompany addDriverData(@PathVariable String transferCompanyName){
        transferCompanyName = ControllerHelper.convertToUtf(transferCompanyName);
        logger.debug("REST request. Path:/registrationOfGoods/train/{}  method: POST", transferCompanyName);
        TransferCompany transferCompany = driverService.save(new TransferCompany(transferCompanyName));
        return transferCompany;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> addDriver(@RequestBody OwnerCompanyDto client){
        logger.debug("REST request. Path:/customer/  method: POST Request body {}", client);

        return null;
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
