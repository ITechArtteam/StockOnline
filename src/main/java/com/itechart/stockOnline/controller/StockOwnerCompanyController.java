package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.converter.ClientDtoConverter;
import com.itechart.stockOnline.dao.AddressDao;
import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.ClientDto;
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
    private StockOwnerCompanyDao stockOwnerCompanyDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private ClientDtoConverter clientDtoConverter;

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public ClientDto getClientData(@PathVariable String name){
        logger.debug("REST request. Path:/customer/{}  method: GET", name);
        name = convertParameterToUtf(name);
        StockOwnerCompany clientCompany =
                stockOwnerCompanyDao.findByName(name).orElseThrow(DataNotFoundError::new);
        return clientDtoConverter.toClientDto(clientCompany);
    }

    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<Object> addClient(@RequestBody ClientDto client){
        logger.debug("REST request. Path:/customer/  method: POST Request body {}", client);
        StockOwnerCompany stockOwnerCompany = clientDtoConverter.toStockOwnerCompany(client);
        if (stockOwnerCompany.getId() > -1){
            StockOwnerCompany companyInDB =
                    stockOwnerCompanyDao.findById(stockOwnerCompany.getId()).orElseThrow(DataNotFoundError::new);
            clientDtoConverter.updateStockOwnerCompany(companyInDB, stockOwnerCompany);
        } else {
            stockOwnerCompany.setId(null);
            User admin = stockOwnerCompany.getAdmin();
            Address adminAddress = admin.getAddress();
            adminAddress = addressDao.save(adminAddress);
            admin.setAddress(adminAddress);
            admin = userDao.save(admin);
            stockOwnerCompany.setAdmin(admin);
            stockOwnerCompany.setAddress(addressDao.save(stockOwnerCompany.getAddress()));
            stockOwnerCompanyDao.save(stockOwnerCompany);
        }
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.OK);
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> dataNotFound(){
        return new ResponseEntity<>(
                "Данных нет", new HttpHeaders(), HttpStatus.NOT_FOUND);
    }

    private String convertParameterToUtf(String name) {
        try {
            name =  new String(name.getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            logger.error("Can't converted param {} to utf.", name);
        }
        return name;
    }


}
