package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.model.dto.waybillregistration.waybillownercompany.StockOwnerCompanyWaybillDto;
import com.itechart.stockOnline.model.dto.waybillregistration.waybillownercompany.StockOwnerCompanyWaybillDtoBuilder;
import com.itechart.stockOnline.service.StockOwnerCompanyService;
import com.itechart.stockOnline.util.ControllerHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/customer")
public class StockOwnerCompanyController {

    private static final Logger logger = LoggerFactory.getLogger(StockOwnerCompanyController.class);

    private final StockOwnerCompanyService companyService;

    @Autowired
    private StockOwnerCompanyWaybillDtoBuilder waybillDtoBuilder;

    @Autowired
    public StockOwnerCompanyController(StockOwnerCompanyService companyService) {
        this.companyService = companyService;
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<StockOwnerCompanyWaybillDto> getStockOwnerCompaniesForWaybill() {
        List<StockOwnerCompany> companies = companyService.getAll();

        return waybillDtoBuilder.buildDtoList(companies);
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public OwnerCompanyDto getClientData(@PathVariable String name){
        name = ControllerHelper.convertToUtf(name);
        logger.debug("REST request. Path:/customer/{}  method: GET", name);
        return companyService.getClientDtoForOwnerCompany(name);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> addClient(@RequestBody OwnerCompanyDto client){
        logger.debug("REST request. Path:/customer/  method: POST Request body {}", client);
        StockOwnerCompany company = companyService.saveOrUpdateStockOwnerCompany(client);
        return new ResponseEntity<>(company.getId(), new HttpHeaders(), HttpStatus.OK);
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
