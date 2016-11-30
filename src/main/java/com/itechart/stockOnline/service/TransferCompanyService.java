package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.TransferCompany;

import java.util.List;

public interface TransferCompanyService {
    TransferCompany save(TransferCompany company);
    TransferCompany update(TransferCompany company);
    TransferCompany findByName(String name);
    List<TransferCompany> getAll();
    void delete(TransferCompany company);
}
