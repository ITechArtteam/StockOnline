package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.ClientCompany;

import java.util.List;

public interface ClientCompanyService {
    ClientCompany getById(Long id);
    List<ClientCompany> getAll();
    ClientCompany save(ClientCompany clientCompany);
    ClientCompany getByName(String name);
}
