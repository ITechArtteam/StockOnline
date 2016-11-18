package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.OwnerCompanyDtoConverter;
import com.itechart.stockOnline.dao.AddressDao;
import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.model.dto.StockOwnerPage;
import com.itechart.stockOnline.validator.StockOwnerCompanyValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class StockOwnerCompanyServiceImpl implements StockOwnerCompanyService {

    private static final Logger logger = LoggerFactory.getLogger(StockOwnerCompanyServiceImpl.class);

    @Autowired
    private StockOwnerCompanyDao stockOwnerCompanyDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private OwnerCompanyDtoConverter ownerCompanyDtoConverter;

    @Autowired
    private StockOwnerCompanyValidator companyValidator;

    @Override
    public OwnerCompanyDto getClientDtoForOwnerCompany(String nameCompany) {
        StockOwnerCompany clientCompany =
                stockOwnerCompanyDao.findByName(nameCompany).orElseThrow(DataNotFoundError::new);
        return ownerCompanyDtoConverter.toClientDto(clientCompany);
    }

    @Override
    public int saveStockOwnerCompany(StockOwnerCompany stockOwnerCompany) {
        companyValidator.checkNewOwnerCompany(stockOwnerCompany);
        stockOwnerCompany.setId(null);
        User admin = stockOwnerCompany.getAdmin();
        Address adminAddress = admin.getAddress();
        adminAddress = addressDao.save(adminAddress);
        admin.setAddress(adminAddress);
        admin = userDao.save(admin);
        stockOwnerCompany.setAdmin(admin);
        stockOwnerCompany.setAddress(addressDao.save(stockOwnerCompany.getAddress()));
        stockOwnerCompany = stockOwnerCompanyDao.save(stockOwnerCompany);
        return stockOwnerCompany.getId();
    }

    @Override
    public int updateStockOwnerCompany(StockOwnerCompany stockOwnerCompany) {
        companyValidator.checkNewOwnerCompany(stockOwnerCompany);
        StockOwnerCompany companyInDB =
                stockOwnerCompanyDao.findById(stockOwnerCompany.getId()).orElseThrow(DataNotFoundError::new);
        ownerCompanyDtoConverter.updateStockOwnerCompany(companyInDB, stockOwnerCompany);
        return companyInDB.getId();
    }

    @Override
    public StockOwnerPage getStockOwnersPage(int pageNumber, int recordCount) {
        if(pageNumber <= 0 || recordCount <= 0) {
            throw new DataNotFoundError();
        }
        Page<StockOwnerCompany> clientCompanyPage = stockOwnerCompanyDao.findAll(new PageRequest(pageNumber - 1, recordCount));
        if(clientCompanyPage.getTotalPages() > 0 && clientCompanyPage.getTotalPages() < pageNumber) {
            throw new DataNotFoundError();
        }
        return ownerCompanyDtoConverter.toStockOwnerPage(clientCompanyPage);
    }

    @Override
    @Transactional
    public void deleteByNames(Collection<String> names) {
        int deletedCount = stockOwnerCompanyDao.deleteByNameIn(names);
        logger.info("Stock owner company service: delete by names list - {}. Deleted {} records", names, deletedCount);
    }
}
