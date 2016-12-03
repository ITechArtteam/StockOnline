package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.TransferCompanyDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.TransferCompany;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferCompanyServiceImpl implements TransferCompanyService {

    private static final Logger logger = LoggerFactory.getLogger(TransferCompanyServiceImpl.class);

    @Autowired
    private TransferCompanyDao transferCompanyDao;

    @Override
    public TransferCompany save(TransferCompany company) {
        return null;
    }

    @Override
    public TransferCompany update(TransferCompany company) {
        return null;
    }

    @Override
    public TransferCompany findByName(String name) {
        TransferCompany company = transferCompanyDao.findByName(name);
        if (company == null){
            throw new DataNotFoundError(String.format("Компани %s не найдена.", name));
        }
        logger.debug("findByName({}): {}", name, company);
        return company;
    }

    public List<TransferCompany> getAll() {
        return transferCompanyDao.findAll();
    }

    @Override
    public void delete(TransferCompany company) {

    }

    @Override
    public TransferCompany findByDriverId(Long driverId) {
        return transferCompanyDao.findByDriversId(driverId);
    }
}
