package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.dto.stock.StockDto;
import com.itechart.stockOnline.model.dto.stock.StockPage;

import java.util.Collection;
import java.util.List;

public interface StockService {

    StockDto getStockDtoForStock(Long id);
    Stock saveStock(Stock stock, StockDto stockDto);
    Stock update(Stock stock);
    StockPage getStockPage(int pageNumber, int recordCount, String name, String address, String login);
    List<Stock> getByCompanyId(Long companyId);
    void delete(Stock stock);
    int deleteByIds(Collection<Integer> ids);
    Stock saveOrUpdateStock(StockDto stockDto, String login);
}
