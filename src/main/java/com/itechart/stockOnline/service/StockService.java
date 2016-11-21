package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.dto.StockDto;
import com.itechart.stockOnline.model.dto.StockPage;

import java.util.Collection;

public interface StockService {

    StockDto getStockDtoForStock(Integer id);
    Stock saveStock(Stock stock);
    Stock update(Stock stock);
    StockPage getStockPage(int pageNumber, int recordCount, String name, String address);
    void deleteByIds(Collection<Integer> ids);

}
