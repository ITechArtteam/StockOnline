package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.OwnerCompanyDtoConverter;
import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.model.dto.StockOwnerPage;
import com.itechart.stockOnline.validator.StockOwnerCompanyValidator;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.itechart.stockOnline.dao.specification.StockOwnerCompanySpecifications.*;
import static org.springframework.data.jpa.domain.Specifications.where;

@Service
public class StockOwnerCompanyServiceImpl implements StockOwnerCompanyService {

    private static final Logger logger = LoggerFactory.getLogger(StockOwnerCompanyServiceImpl.class);

    private final StockOwnerCompanyDao stockOwnerCompanyDao;

    private final OwnerCompanyDtoConverter ownerCompanyDtoConverter;

    private final StockOwnerCompanyValidator companyValidator;

    private final UserService userService;

    private final AddressService addressService;

    @Autowired
    private StockService stockService;

    @Autowired
    public StockOwnerCompanyServiceImpl(StockOwnerCompanyDao stockOwnerCompanyDao, UserService userService, OwnerCompanyDtoConverter ownerCompanyDtoConverter, StockOwnerCompanyValidator companyValidator, AddressService addressService) {
        this.stockOwnerCompanyDao = stockOwnerCompanyDao;
        this.userService = userService;
        this.ownerCompanyDtoConverter = ownerCompanyDtoConverter;
        this.companyValidator = companyValidator;
        this.addressService = addressService;

    }

    public List<StockOwnerCompany> getAll() {
        return stockOwnerCompanyDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public OwnerCompanyDto getClientDtoForOwnerCompany(String nameCompany) {
        StockOwnerCompany clientCompany =
                stockOwnerCompanyDao.findByName(nameCompany).orElseThrow(DataNotFoundError::new);
        logger.debug("getClientDtoForOwnerCompany({}): {}", nameCompany, clientCompany);
        User admin = userService.findByCompany(clientCompany);
        return ownerCompanyDtoConverter.toClientDto(clientCompany, admin);
    }

    @Override
    @Secured({"ROLE_SUPER_ADMIN"})
    public StockOwnerPage getStockOwnersPage(int pageNumber, int recordCount, String name, String address, String status) {
        if(pageNumber <= 0 || recordCount <= 0) {
            throw new DataNotFoundError();
        }
        Specification<StockOwnerCompany> specification = null;
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

        if(StringUtils.isNotBlank(status) && !StringUtils.equals(status, "2")) {
            boolean isActive = StringUtils.equals(status, "1");
            if(specification != null) {
                specification = where(specification).and(statusEqual(isActive));
            } else {
                specification = where(statusEqual(isActive));
            }
        }


        Page<StockOwnerCompany> clientCompanyPage = stockOwnerCompanyDao.findAll(specification, new PageRequest(pageNumber - 1, recordCount));
        if(clientCompanyPage.getTotalPages() > 0 && clientCompanyPage.getTotalPages() < pageNumber) {
            throw new DataNotFoundError();
        }
        return ownerCompanyDtoConverter.toStockOwnerPage(clientCompanyPage);
    }

    @Override
    @Transactional
    public void delete(StockOwnerCompany company) {
        company.getUsers().forEach(userService::delete);
        company.getStocks().forEach(stockService::delete);
        Address address = company.getAddress();
        stockOwnerCompanyDao.delete(company);
        addressService.delete(address);
    }

    @Override
    @Transactional
    public int deleteByNames(Collection<String> names) {
        stockOwnerCompanyDao.findAllByNameIn(names).forEach(this::delete);
        logger.info("Stock owner company service: delete by names list - {}. Deleted {} records", names, names.size());
        return names.size();
    }

    @Override
    @Transactional
    public StockOwnerCompany saveOrUpdateStockOwnerCompany(OwnerCompanyDto ownerCompanyDto) {
        StockOwnerCompany stockOwnerCompany = ownerCompanyDtoConverter.toStockOwnerCompany(ownerCompanyDto);
        User admin = ownerCompanyDtoConverter.toUser(ownerCompanyDto);
        if (stockOwnerCompany.getId() > -1){
            stockOwnerCompany = update(stockOwnerCompany);

            admin.setId(userService.findByCompany(stockOwnerCompany).getId());
            admin.setStockOwnerCompany(stockOwnerCompany);
            userService.update(admin);
        } else {
            stockOwnerCompany = saveStockOwnerCompany(stockOwnerCompany);

            admin = setAdminRole(admin);
            admin.setStockOwnerCompany(stockOwnerCompany);
            userService.save(admin);
        }
        return stockOwnerCompany;
    }

    @Override
    @Transactional
    public StockOwnerCompany update(StockOwnerCompany stockOwnerCompany) {
        validationFields(stockOwnerCompany);

        StockOwnerCompany companyInDB =
                stockOwnerCompanyDao.findOne(stockOwnerCompany.getId());
        if (companyInDB == null){
            throw new DataNotFoundError("StockOwnerCompany with id: " + stockOwnerCompany.getId());
        }
        logger.debug("update: \n{} -> \n{}", companyInDB, stockOwnerCompany);
        updateData(stockOwnerCompany, companyInDB);

        return companyInDB;
    }

    @Override
    @Transactional
    public StockOwnerCompany saveStockOwnerCompany(StockOwnerCompany stockOwnerCompany) {
        stockOwnerCompany.setId(null);
        stockOwnerCompany.setActive(true);
        logger.debug("saveOrUpdateStockOwnerCompany({})", stockOwnerCompany);
        validationFields(stockOwnerCompany);
        return stockOwnerCompanyDao.save(stockOwnerCompany);
    }

    private void validationFields(StockOwnerCompany stockOwnerCompany) {
        Map<String, String> errors = companyValidator.checkNewOwnerCompany(stockOwnerCompany);
        if (errors.size() > 0){
            throw new ValidationError(errors);
        }
    }

    private void updateData(StockOwnerCompany stockOwnerCompany, StockOwnerCompany companyInDB) {
        companyInDB.setName(stockOwnerCompany.getName());
        Address address = stockOwnerCompany.getAddress();
        address.setId(companyInDB.getAddress().getId());
        addressService.update(address);
        companyInDB.setActive(stockOwnerCompany.getActive());
    }

    private User setAdminRole(User admin) {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("ADMIN"));
        admin.setRoles(roles);
        return admin;
    }
}
