package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.Act;
import com.itechart.stockOnline.model.StockOwnerCompany;

public interface CompanyService {

    StockOwnerCompany get(Long id);
}
