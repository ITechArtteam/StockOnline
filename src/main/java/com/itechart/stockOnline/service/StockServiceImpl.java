package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.StockDtoConverter;
import com.itechart.stockOnline.dao.StockDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.User;
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

import java.util.Collection;

import static com.itechart.stockOnline.dao.specification.StockSpecifications.*;
import static org.springframework.data.jpa.domain.Specifications.where;

@Service
public class StockServiceImpl implements StockService {

    private static final Logger logger = LoggerFactory.getLogger(StockServiceImpl.class);

    private final StockDao stockDao;

    private final StockDtoConverter stockDtoConverter;

    private final UserService userService;

    private final AddressService addressService;


    @Autowired
    public StockServiceImpl(StockDao stockDao, UserService userService, StockDtoConverter stockDtoConverter, AddressService addressService) {
        this.stockDao = stockDao;
        this.userService = userService;
        this.stockDtoConverter = stockDtoConverter;
        this.addressService = addressService;
    }


    @Override
    @Transactional(readOnly = true)
    public StockDto getStockDtoForStock(Integer id) {
        Stock stock =
                stockDao.findById(id).orElseThrow(DataNotFoundError::new);
        logger.debug("getStockDtoForStock({}): {}", id, stock);
        User admin = userService.findByCompany(stock.getCompany());
        return stockDtoConverter.toStockDto(stock, admin);
    }

    @Override
    @Transactional
    public Stock saveStock(Stock stock) {
        stock.setId(null);
        logger.debug("saveStock({})", stock);
        stock.setAddress(addressService.save(stock.getAddress()));
        stock = stockDao.save(stock);
        return stock;
    }


    @Override
    @Transactional
    public Stock update(Stock stock) {

        Stock stockInDB =
                stockDao.findOne(stock.getId());
        if (stockInDB == null){
            throw new DataNotFoundError("StockOwnerCompany with id: " + stock.getId());
        }
        logger.debug("update: \n{} -> \n{}", stockInDB, stock);
        updateData(stock, stockInDB);

        return stockInDB;
    }

    private void updateData(Stock stock, Stock stockInDB) {
        stockInDB.setName(stock.getName());
        stock.getAddress().setId(stockInDB.getAddress().getId());
        stockInDB.setAddress(addressService.update(stock.getAddress()));
    }

    @Override
    public StockPage getStockPage(int pageNumber, int recordCount, String name, String address) {
        if(pageNumber <= 0 || recordCount <= 0) {
            throw new DataNotFoundError();
        }
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

        Page<Stock> stockPage = stockDao.findAll(/*specification,*/ new PageRequest(pageNumber - 1, recordCount));
        if(stockPage.getTotalPages() > 0 && stockPage.getTotalPages() < pageNumber) {
            throw new DataNotFoundError();
        }
        return stockDtoConverter.toStockPage(stockPage);
    }

    @Override
    @Transactional
    public void deleteByIds(Collection<Integer> ids) {
        int deletedCount = stockDao.deleteByIdIn(ids);
        logger.info("Stock service: delete by ids list - {}. Deleted {} records", ids, deletedCount);
    }
}
