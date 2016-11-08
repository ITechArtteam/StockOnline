package com.itechart.stockOnline.model.dto;

import java.io.Serializable;
import java.util.List;

public class StockOwnerPage implements Serializable {
    private long activePage;
    private long totalItemsCount;
    private long itemsCountPerPage;
    private List<StockOwnerCompanyBriefDto> clientList;

    public StockOwnerPage() {
    }

    public StockOwnerPage(long activePage, long totalItemsCount, long itemsCountPerPage, List<StockOwnerCompanyBriefDto> clientList) {
        this.activePage = activePage;
        this.totalItemsCount = totalItemsCount;
        this.itemsCountPerPage = itemsCountPerPage;
        this.clientList = clientList;
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

    public long getItemsCountPerPage() {
        return itemsCountPerPage;
    }

    public void setItemsCountPerPage(long itemsCountPerPage) {
        this.itemsCountPerPage = itemsCountPerPage;
    }

    public List<StockOwnerCompanyBriefDto> getClientList() {
        return clientList;
    }

    public void setClientList(List<StockOwnerCompanyBriefDto> clientList) {
        this.clientList = clientList;
    }
}
