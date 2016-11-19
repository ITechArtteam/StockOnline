package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.converter.OwnerCompanyDtoConverter;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.service.StockOwnerCompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value = "/customer")
public class StockOwnerCompanyController {

    private static final Logger logger = LoggerFactory.getLogger(StockOwnerCompanyController.class);

    private final OwnerCompanyDtoConverter ownerCompanyDtoConverter;

    private final StockOwnerCompanyService companyService;

    @Autowired
    public StockOwnerCompanyController(StockOwnerCompanyService companyService, OwnerCompanyDtoConverter ownerCompanyDtoConverter) {
        this.companyService = companyService;
        this.ownerCompanyDtoConverter = ownerCompanyDtoConverter;
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public OwnerCompanyDto getClientData(@PathVariable String name){
        logger.debug("REST request. Path:/customer/{}  method: GET", name);
        name = convertParameterToUtf(name);
        return companyService.getClientDtoForOwnerCompany(name);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> addClient(@RequestBody OwnerCompanyDto client){
        logger.debug("REST request. Path:/customer/  method: POST Request body {}", client);
        StockOwnerCompany stockOwnerCompany = ownerCompanyDtoConverter.toStockOwnerCompany(client);
        if (stockOwnerCompany.getId() > -1){
            stockOwnerCompany = companyService.updateStockOwnerCompany(stockOwnerCompany);
        } else {
            stockOwnerCompany = companyService.saveStockOwnerCompany(stockOwnerCompany);
        }
        return new ResponseEntity<>(stockOwnerCompany.getId(), new HttpHeaders(), HttpStatus.OK);
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


    private String convertParameterToUtf(String parameter) {
        try {
            parameter =  new String(parameter.getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            logger.debug("Can't converted param {} to utf.", parameter);
        }
        return parameter;
    }


}
