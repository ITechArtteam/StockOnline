package com.itechart.stockOnline.model.dto;

import com.itechart.stockOnline.model.dto.forControllerPage.WaybillForControllerDto;

import java.util.List;

public class WaybillPage {
    private long activePage;
    private long totalItemsCount;
    private long itemsCountPerPage;
    private List<WaybillForControllerDto> waybills;

    public WaybillPage() {
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

    public List<WaybillForControllerDto> getWaybills() {
        return waybills;
    }

    public void setWaybills(List<WaybillForControllerDto> waybills) {
        this.waybills = waybills;
    }
}
