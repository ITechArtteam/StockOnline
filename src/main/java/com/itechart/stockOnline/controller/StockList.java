package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.dao.StockDao;
import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.dto.StockDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/stockList")
public class StockList {
    private final static Logger Logger = LoggerFactory.getLogger(StockList.class);

    @Autowired
    private StockDao stockDao;

    @RequestMapping(value = "/{pageNumber}/{recordCount}", method = RequestMethod.GET)
    public List<StockDto> getStockList(@PathVariable Integer pageNumber, @PathVariable Integer recordCount) {
        Page<Stock> stockPage = stockDao.findAll(new PageRequest(pageNumber, recordCount));
        List<StockDto> stockDtos = new ArrayList<>();
        stockPage.forEach((stock) -> {
            StockDto stockDto = new StockDto();
            stockDto.setId(stock.getId());
            stockDto.setCountry(stock.getAddress().getCountryName());
            stockDto.setCity(stock.getAddress().getCityName());
            stockDto.setStreet(stock.getAddress().getStreet());
            stockDto.setNameCompany(stock.getCompany().getName());
            stockDtos.add(stockDto);
        });

        StockDto d = new StockDto();
        d.setNameCompany("First");
        stockDtos.add(d);
        d = new StockDto();
        d.setNameCompany("Second");
        stockDtos.add(d);
        d = new StockDto();
        d.setNameCompany("Third");
        stockDtos.add(d);
        return stockDtos;
    }
}