package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.TransferCompany;

public interface TransferCompanyService {
    TransferCompany save(TransferCompany company);
    TransferCompany update(TransferCompany company);
    TransferCompany findByName(String name);
    void delete(TransferCompany company);
}
