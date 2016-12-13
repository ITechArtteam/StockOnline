package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.OwnerCompanyDtoConverter;
import com.itechart.stockOnline.converter.StockDtoConverter;
import com.itechart.stockOnline.dao.StockDao;
import com.itechart.stockOnline.dao.RoomDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.*;
import com.itechart.stockOnline.model.dto.stock.StockDto;
import com.itechart.stockOnline.model.dto.stock.StockPage;
import org.apache.commons.collections.CollectionUtils;
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

import java.util.Collection;

import java.util.Set;
import java.util.List;


import static com.itechart.stockOnline.dao.specification.StockSpecifications.*;
import static org.springframework.data.jpa.domain.Specifications.where;

@Service
public class StockServiceImpl implements StockService {

    private static final Logger logger = LoggerFactory.getLogger(StockServiceImpl.class);

    private final StockDao stockDao;
    private final RoomDao roomDao;
    private final UserDao userDao;
    private final OwnerCompanyDtoConverter ownerCompanyDtoConverter;
    private final StockDtoConverter stockDtoConverter;

    private final UserService userService;

    private final AddressService addressService;

    @Autowired
    private StockOwnerCompanyService stockOwnerCompanyService;

    @Autowired
    private RoomService roomService;

    @Autowired
    public StockServiceImpl(StockDao stockDao, RoomDao roomDao, UserDao userDao, UserService userService, StockDtoConverter stockDtoConverter,OwnerCompanyDtoConverter ownerCompanyDtoConverter, AddressService addressService) {
        this.stockDao = stockDao;
        this.roomDao = roomDao;
        this.userDao = userDao;
        this.userService = userService;
        this.stockDtoConverter = stockDtoConverter;
        this.ownerCompanyDtoConverter = ownerCompanyDtoConverter;
        this.addressService = addressService;
    }


    @Override
    @Transactional(readOnly = true)
    public StockDto getStockDtoForStock(Long id) {
        Stock stock =
                stockDao.findById(id).orElseThrow(DataNotFoundError::new);
        Set<User> users =userService.findAllByStockOwnerCompany(stock.getCompany());
        User admin = new User();
        if(CollectionUtils.isNotEmpty(users)){
            for (User user : users){
                if (user.getRoles().contains(new Role("ADMIN"))){
                    admin = user;
                }
            }
        }
        Set<Room> rooms = roomService.getRooms(stock.getId());
        stock.setRooms(rooms);
        logger.debug("getStockDtoForStock({}): {}", id, stock);
        return stockDtoConverter.toStockDto(stock, admin);
    }

    @Override
    public List<Stock> getByCompanyId(Long companyId) {
        logger.debug("getByCompanyId({})", companyId);
        List<Stock> resultList = stockDao.findAllByCompanyId(companyId);
        logger.info("getByCompanyId({}) - found: {}", companyId, resultList);
        return resultList;
    }

    @Override
    @Transactional
    @Secured({"ROLE_ADMIN"})
    public StockPage getStockPage(int pageNumber, int recordCount, String name, String address, String login) {
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
        User user = userDao.findByLogin(login).orElseThrow(DataNotFoundError::new);
        StockOwnerCompany stockOwnerCompany = user.getStockOwnerCompany();
        logger.info("Stock service:  stockOwnerCompany - {}.", stockOwnerCompany);
        Long id = stockOwnerCompany.getId();
        logger.info("Stock service:  stockOwnerCompany id - {}.", id);
        login = stockOwnerCompany.getName();
        if(StringUtils.isNotEmpty(login)) {
            if(specification != null) {
                specification = where(specification).and(companyLike(login));
            } else {
                specification = where(companyLike(login));
            }
        }

        Page<Stock> stockPage = stockDao.findAll(specification, new PageRequest(pageNumber - 1, recordCount));
        if(stockPage.getTotalPages() > 0 && stockPage.getTotalPages() < pageNumber) {
            throw new DataNotFoundError();
        }
        logger.info("Stock service: getStockPage stockPage - {}.", stockPage);
        return stockDtoConverter.toStockPage(stockPage);
    }

    @Override
    @Transactional
    public void delete(Stock stock) {
        Address address = stock.getAddress();
        roomService.deleteById(stock.getId());
        stockDao.delete(stock);
        addressService.delete(address);
    }

    @Override
    @Transactional
    public int deleteByIds(Collection<Long> ids) {
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
        logger.debug("saveOrUpdateStock:  stock: {}", stock);
        if (stock.getId() > -1){
            stock = update(stock);
        } else {
            stock = saveStock(stock, stockDto);
        }
        return stock;
    }

    @Override
    @Transactional
    public Stock saveStock(Stock stock, StockDto stockDto) {
        stock.setId(null);
        stock = stockDao.save(stock);
        Set<Room> rooms = stockDtoConverter.toRooms(stockDto);
        if (CollectionUtils.isNotEmpty(rooms)) {
            for (Room room : rooms) {
                room.setStock(stock);
                room = roomService.saveRoom(room);
            }
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
        logger.debug("update:  stockInDB: {}; stock: {}", stockInDB, stock);
        updateData(stock, stockInDB);

        return stockInDB;
    }

    private void updateData(Stock stock, Stock InDB) {
        Set<Room> rooms = stock.getRooms();
        if (CollectionUtils.isNotEmpty(rooms)) {
            for (Room room : rooms) {
                room.setStock(stock);
                Long id = room.getId();
                if (id instanceof Long){
                    room = roomService.update(room);
                }else{
                    room = roomService.saveRoom(room);
                }

            }
        }
        InDB.setName(stock.getName());
        Address address = stock.getAddress();
        address.setId(InDB.getAddress().getId());
        addressService.update(address);
    }

}
