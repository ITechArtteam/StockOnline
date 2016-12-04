package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.ClientCompanyDao;
import com.itechart.stockOnline.model.ClientCompany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientCompanyServiceImpl implements ClientCompanyService {

    @Autowired
    private ClientCompanyDao clientCompanyDao;

    @Override
    public ClientCompany getById(Long id) {
        return clientCompanyDao.findById(id);
    }
}
