package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.Room;
import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.dto.stock.StockDto;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.service.StockService;
import com.itechart.stockOnline.service.RoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping(value = "/stock")
public class StockController {

    private static final Logger logger = LoggerFactory.getLogger(StockController.class);

    private final StockService stockService;
    private final RoomService roomService;

    @Autowired
    public StockController(StockService stockService, RoomService roomService) {
        this.stockService = stockService;
        this.roomService = roomService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public StockDto getStockData(@PathVariable Integer id){
        logger.debug("REST request. Path:/stock/{}  method: GET", id);
        StockDto stockDto = stockService.getStockDtoForStock(id);
        logger.info("REST response. stockDto: {}  method: GET", stockDto);
        return stockDto;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> addStock(@RequestBody StockDto stockDto,
                                           Principal user){
        logger.debug("REST request. Path:/stock/  method: POST Request body {}, user : {}", stockDto, user);
        Stock stock = stockService.saveOrUpdateStock(stockDto,user.getName());
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
