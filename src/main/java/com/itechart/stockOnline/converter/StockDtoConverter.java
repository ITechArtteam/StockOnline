package com.itechart.stockOnline.converter;

import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.StockDto;
import com.itechart.stockOnline.model.dto.StockPage;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class StockDtoConverter {
    private final static Logger Logger = LoggerFactory.getLogger(StockDtoConverter.class);
    public Stock toStock(StockDto stockDto){

        Stock stock = new Stock();
        Address address = new Address();
        address.setCountryName(stockDto.getCountry());
        address.setCityName(stockDto.getCity());
        address.setStreet(stockDto.getStreet());
        address.setHome(stockDto.getHome());
        address.setRoom(stockDto.getRoom());
        stock.setAddress(address);
        stock.setId(stockDto.getId());
        stock.setCompany(new StockOwnerCompany(stockDto.getNameCompany()));
        Logger.info("toStock: stockDto:{}, address:{}, stock:{}",stockDto,address,stock);
        return stock;
    }

    public StockDto toStockDto(Stock stock) {
        StockDto dto = new StockDto();
        dto.setId(stock.getId());
        Address address = stock.getAddress();
        dto.setCountry(address.getCountryName());
        dto.setCity(address.getCityName());
        dto.setStreet(address.getStreet());
        dto.setHome(address.getHome());
        dto.setRoom(address.getRoom());
        Logger.info("toStockDto: stock:{}, address:{}, stockDto:{}",stock,address,dto);
        return dto;
    }

    public StockPage toStockPage(Page<Stock> page) {
        StockPage result = new StockPage();
        result.setActivePage(page.getNumber() + 1);
        result.setItemsCountPerPage(page.getSize());
        result.setTotalItemsCount(page.getTotalElements());

        List<StockDto> stockDtoList = new ArrayList<>();
        page.forEach((stock) -> stockDtoList.add(toStockDto(stock)));

        result.setStockList(stockDtoList);
        Logger.info("toStockPage: page:{}, stockPage:{}, stockDto:{}",page,result,stockDtoList);
        return result;
    }

}