package com.itechart.stockOnline.model.dto;


import java.io.Serializable;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StockPage implements Serializable{
    private final static Logger Logger = LoggerFactory.getLogger(StockPage.class);
    private long activePage;
    private long totalItemsCount;
    private long itemsCountPerPage;
    private List<StockDto> stockList;

    public StockPage() {
        Logger.info("Emptyconstructor StockPage");
    }

    public StockPage(long activePage, long totalItemsCount, long itemsCountPerPage, List<StockDto> stockList) {
        this.activePage = activePage;
        this.totalItemsCount = totalItemsCount;
        this.itemsCountPerPage = itemsCountPerPage;
        this.stockList = stockList;
        Logger.info("constructor StockPage: activePage:{}, totalItemsCount:{}, itemsCountPerPage:{}, stockList:{}",activePage, totalItemsCount, itemsCountPerPage, stockList);
    }

    public long getActivePage() {
        return activePage;
    }
    public void setActivePage(long activePage) {
        this.activePage = activePage;
    }

    public long getTotalItemsCount() {
        return totalItemsCount;
    }
    public void setTotalItemsCount(long totalItemsCount) {
        this.totalItemsCount = totalItemsCount;
    }

    public long getItemsCountPerPage() { return itemsCountPerPage; }
    public void setItemsCountPerPage(long itemsCountPerPage) {
        this.itemsCountPerPage = itemsCountPerPage;
    }

    public List<StockDto> getStockList() {
        return stockList;
    }
    public void setStockList(List<StockDto> stockList) {
        this.stockList = stockList;
    }
}
