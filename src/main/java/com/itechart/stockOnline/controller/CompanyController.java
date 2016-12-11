package com.itechart.stockOnline.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.service.CompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequestMapping(value = "/api")
public class CompanyController {
    private final static Logger LOGGER = LoggerFactory.getLogger(CompanyController.class);
    @Autowired
    private CompanyService companyService;
    @RequestMapping(value = "/stock_owner_company/{id}", method = RequestMethod.GET)
    StockOwnerCompany getCompany(@PathVariable Long id){
        LOGGER.debug("REST request. Path:/stock_owner_company/{id}  method: GET", id);
        return companyService.get(id);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void exception(Exception exception, HttpServletResponse response){
        LOGGER.error("fieldHasErrors({})", exception.getMessage());
        response.addHeader("result", "Server error.");
    }
}
