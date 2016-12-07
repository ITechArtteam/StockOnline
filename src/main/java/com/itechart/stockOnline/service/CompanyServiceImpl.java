package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.CompanyRepository;
import com.itechart.stockOnline.model.StockOwnerCompany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl implements CompanyService{
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public StockOwnerCompany get(Long id) {
        return companyRepository.findOne(id);
    }
}
