package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.StockDtoConverter;
import com.itechart.stockOnline.dao.StockDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.dto.StockDto;
import com.itechart.stockOnline.model.dto.StockPage;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import java.util.Collection;

import static com.itechart.stockOnline.dao.specification.StockSpecifications.*;
import static org.springframework.data.jpa.domain.Specifications.where;

@Service
public class StockServiceImpl implements StockService {

    private static final Logger logger = LoggerFactory.getLogger(StockServiceImpl.class);

    private final StockDao stockDao;
    private final UserDao userDao;
    private final StockDtoConverter stockDtoConverter;

    private final UserService userService;

    private final AddressService addressService;
    @Autowired
    private StockOwnerCompanyService stockOwnerCompanyService;
    @Autowired
    public StockServiceImpl(StockDao stockDao, UserDao userDao, UserService userService, StockDtoConverter stockDtoConverter, AddressService addressService) {
        this.stockDao = stockDao;
        this.userDao = userDao;
        this.userService = userService;
        this.stockDtoConverter = stockDtoConverter;
        this.addressService = addressService;
    }


    @Override
    @Transactional(readOnly = true)
    public StockDto getStockDtoForStock(Long id) {
        Stock stock =
                stockDao.findById(id).orElseThrow(DataNotFoundError::new);
        logger.debug("getStockDtoForStock({}): {}", id, stock);
        User admin = userService.findByCompany(stock.getCompany());
        return stockDtoConverter.toStockDto(stock, admin);
    }

    @Override
    @Secured({"ROLE_ADMIN"})
    public StockPage getStockPage(int pageNumber, int recordCount, String name, String address, String login) {
        if(pageNumber <= 0 || recordCount <= 0) {
            throw new DataNotFoundError();
        }

        User user = userDao.findByLogin(login).orElseThrow(DataNotFoundError::new);

        String company = user.getStockOwnerCompany().getName();
        logger.info("Stock service: getStockPage company - {}.", login);
        Specification<Stock> specification = null;
        if(StringUtils.isNotEmpty(name)) {
            specification = where(nameLike(name));
        }

        if(StringUtils.isNotEmpty(address)) {
            if(specification != null) {
                specification = where(specification).and(addressLike(address));
            } else {
                specification = where(addressLike(address));
            }
        }

        if(StringUtils.isNotEmpty(company)) {
            if(specification != null) {
                specification = where(specification).and(companyLike(company));
            } else {
                specification = where(companyLike(company));
            }
        }

        Page<Stock> stockPage = stockDao.findAll(specification, new PageRequest(pageNumber - 1, recordCount));
        if(stockPage.getTotalPages() > 0 && stockPage.getTotalPages() < pageNumber) {
            throw new DataNotFoundError();
        }
        return stockDtoConverter.toStockPage(stockPage);
    }

    @Override
    @Transactional
    public void delete(Stock stock) {
        Address address = stock.getAddress();
        stockDao.delete(stock);
        addressService.delete(address);
    }

    @Override
    @Transactional
    public int deleteByIds(Collection<Integer> ids) {
        stockDao.findAllByIdIn(ids).forEach(this::delete);
        logger.info("Stock service: delete by ids list - {}. Deleted {} records", ids, ids.size());
        return ids.size();
    }

    @Override
    @Transactional
    public Stock saveOrUpdateStock(StockDto stockDto, String login) {
        Stock stock = stockDtoConverter.toStock(stockDto);
        User user = userDao.findByLogin(login).orElseThrow(DataNotFoundError::new);
        stock.setCompany(user.getStockOwnerCompany());
        if (stock.getId() > -1){
            stock = update(stock);
        } else {
            stock = saveStock(stock);
        }
        return stock;
    }

    @Override
    @Transactional
    public Stock update(Stock stock) {

        Stock stockInDB =
                stockDao.findOne(stock.getId());
        if (stockInDB == null){
            throw new DataNotFoundError("Stock with id: " + stock.getId());
        }
        logger.debug("update: \n{} -> \n{}", stockInDB, stock);
        updateData(stock, stockInDB);

        return stockInDB;
    }

    @Override
    @Transactional
    public Stock saveStock(Stock stock) {
        stock.setId(null);
        return stockDao.save(stock);
    }



    private void updateData(Stock stock, Stock InDB) {
        InDB.setName(stock.getName());
        Address address = stock.getAddress();
        address.setId(InDB.getAddress().getId());
        addressService.update(address);
    }

}
