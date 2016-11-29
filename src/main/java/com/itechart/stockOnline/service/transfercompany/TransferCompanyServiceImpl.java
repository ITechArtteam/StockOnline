package com.itechart.stockOnline.service.transfercompany;

import com.itechart.stockOnline.dao.TransferCompanyDao;
import com.itechart.stockOnline.model.TransferCompany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferCompanyServiceImpl implements TransferCompanyService {

    @Autowired
    private TransferCompanyDao transferCompanyDao;

    public List<TransferCompany> getAll() {
        return transferCompanyDao.findAll();
    }
}
