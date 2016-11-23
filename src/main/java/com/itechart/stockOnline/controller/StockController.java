package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.dto.StockDto;
import com.itechart.stockOnline.converter.StockDtoConverter;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.service.StockService;
import com.itechart.stockOnline.service.UserService;
import com.itechart.stockOnline.util.ControllerHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(value = "/stock")
public class StockController {

    private static final Logger logger = LoggerFactory.getLogger(StockController.class);

    private final StockDtoConverter stockDtoConverter;

    private final StockService stockService;

    private final UserService userService;

    @Autowired
    public StockController(StockService stockService, StockDtoConverter stockDtoConverter, UserService userService) {
        this.stockService = stockService;
        this.stockDtoConverter = stockDtoConverter;
        this.userService = userService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public StockDto getStockData(@PathVariable Long id){
        logger.debug("REST request. Path:/stock/{}  method: GET", id);
        return stockService.getStockDtoForStock(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> addStock(@RequestBody StockDto stockDto){
        logger.debug("REST request. Path:/stock/  method: POST Request body {}", stockDto);
        Stock stock = stockDtoConverter.toStock(stockDto);
        if (stock.getId() > -1){
            stock = stockService.update(stock);
        } else {
            stock = stockService.saveStock(stock);
        }
        return new ResponseEntity<>(stock.getId(), new HttpHeaders(), HttpStatus.OK);
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
