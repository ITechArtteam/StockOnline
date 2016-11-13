package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.converter.OwnerCompanyDtoConverter;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.NotValidError;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.service.StockOwnerCompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value = "/customer")
public class StockOwnerCompanyController {

    private static final Logger logger = LoggerFactory.getLogger(StockOwnerCompanyController.class);

    @Autowired
    private OwnerCompanyDtoConverter ownerCompanyDtoConverter;

    @Autowired
    private StockOwnerCompanyService companyService;

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public OwnerCompanyDto getClientData(@PathVariable String name){
        logger.debug("REST request. Path:/customer/{}  method: GET", name);
        name = convertParameterToUtf(name);
        return companyService.getClientDtoForOwnerCompany(name);
    }

    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<Object> addClient(@RequestBody OwnerCompanyDto client){
        logger.debug("REST request. Path:/customer/  method: POST Request body {}", client);
        StockOwnerCompany stockOwnerCompany = ownerCompanyDtoConverter.toStockOwnerCompany(client);
        int idCompany;
        if (stockOwnerCompany.getId() > -1){
            idCompany = companyService.updateStockOwnerCompany(stockOwnerCompany);
        } else {
            idCompany = companyService.saveStockOwnerCompany(stockOwnerCompany);
        }
        return new ResponseEntity<>(idCompany, new HttpHeaders(), HttpStatus.OK);
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> dataNotFound(){
        return new ResponseEntity<>(
                "Компания не найдена", new HttpHeaders(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = NotValidError.class)
    public ResponseEntity<Object> fieldHasErrors(NotValidError error){
        System.out.println(error.getErrorsDto());
        return new ResponseEntity<>(
                error.getErrorsDto(), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


    private String convertParameterToUtf(String parameter) {
        try {
            parameter =  new String(parameter.getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            logger.error("Can't converted param {} to utf.", parameter);
        }
        return parameter;
    }


}
