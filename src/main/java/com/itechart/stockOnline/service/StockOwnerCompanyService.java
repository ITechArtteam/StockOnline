package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.model.dto.StockOwnerPage;

import java.util.Collection;

public interface StockOwnerCompanyService {
    OwnerCompanyDto getClientDtoForOwnerCompany(String nameCompany);
    StockOwnerCompany saveStockOwnerCompany(StockOwnerCompany stockOwnerCompany);
    StockOwnerCompany updateStockOwnerCompany(StockOwnerCompany stockOwnerCompany);
    StockOwnerPage getStockOwnersPage(int pageNumber, int recordCount, String name, String address, String status);
    void deleteByNames(Collection<String> names);
}
