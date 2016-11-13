package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;

public interface StockOwnerCompanyService {
    OwnerCompanyDto getClientDtoForOwnerCompany(String nameCompany);
    int saveStockOwnerCompany(StockOwnerCompany stockOwnerCompany);
    int updateStockOwnerCompany(StockOwnerCompany stockOwnerCompany);
}
