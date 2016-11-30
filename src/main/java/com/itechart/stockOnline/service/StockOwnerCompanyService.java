package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.model.dto.StockOwnerPage;

import java.util.Collection;
import java.util.List;

public interface StockOwnerCompanyService {

    List<StockOwnerCompany> getAll();
    OwnerCompanyDto getClientDtoForOwnerCompany(String nameCompany);
    StockOwnerCompany saveStockOwnerCompany(StockOwnerCompany stockOwnerCompany);
    StockOwnerCompany update(StockOwnerCompany stockOwnerCompany);
    StockOwnerPage getStockOwnersPage(int pageNumber, int recordCount, String name, String address, String status);
    void delete(StockOwnerCompany company);
    int deleteByNames(Collection<String> names);
    StockOwnerCompany saveOrUpdateStockOwnerCompany(OwnerCompanyDto ownerCompanyDto);
}
