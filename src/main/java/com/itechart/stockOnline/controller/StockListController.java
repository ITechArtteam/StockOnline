package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.converter.StockDtoConverter;
import com.itechart.stockOnline.dao.StockDao;
import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.dto.StockPage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/stockList")
public class StockListController {
    private final static Logger Logger = LoggerFactory.getLogger(StockListController.class);

    @Autowired
    private StockDao stockDao;

    @Autowired
    private StockDtoConverter stockDtoConverter;

    @RequestMapping(value = "/page/{pageNumber}/limit/{recordCount}", method = RequestMethod.GET)
    public StockPage getStockList(@PathVariable Integer pageNumber, @PathVariable Integer recordCount) {
        Logger.info("REST request. Path:/stocks/page{}/limit{}  method: GET", pageNumber, recordCount);
        Page<Stock> stockPage = stockDao.findAll(new PageRequest(pageNumber - 1, recordCount));
        return stockDtoConverter.toStockPage(stockPage);
    }
}