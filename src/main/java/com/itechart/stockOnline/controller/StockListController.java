package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.dto.StockPage;
import com.itechart.stockOnline.exception.DataNotFoundError;

import com.itechart.stockOnline.service.StockService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.itechart.stockOnline.util.ControllerHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/stockList")
public class StockListController {
    private final static Logger LOGGER = LoggerFactory.getLogger(StockListController.class);

    @Autowired
    private StockService stockService;

    @RequestMapping(value = "/page/{pageNumber}/limit/{recordCount}", method = RequestMethod.GET)
    public StockPage getStockList(@PathVariable Integer pageNumber,
                                        @PathVariable Integer recordCount,
                                        @RequestParam String name,
                                        @RequestParam String address) {
        LOGGER.info("REST request. Path:/stockList/page/{}/limit/{}/?name={}&address={}  method: GET", pageNumber, recordCount, name, address);
        name = ControllerHelper.convertToUtf(name);
        address = ControllerHelper.convertToUtf(address);
        return stockService.getStockPage(pageNumber, recordCount, name, address);
    }
    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteClients(@RequestParam(value = "namesToDelete") List<Integer> ids) {
        LOGGER.info("REST request. Path:/stockList/?namesToDelete={}  method: DELETE", ids);
        stockService.deleteByIds(ids);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> dataNotFound(){
        return new ResponseEntity<>(
                "Can't get stocks list", new HttpHeaders(), HttpStatus.NOT_FOUND);
    }
}