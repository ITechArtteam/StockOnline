package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.OwnerCompanyDtoConverter;
import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.validator.StockOwnerCompanyValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class StockOwnerCompanyServiceImpl implements StockOwnerCompanyService {

    private static final Logger logger = LoggerFactory.getLogger(StockOwnerCompanyServiceImpl.class);

    private final StockOwnerCompanyDao stockOwnerCompanyDao;

    private final OwnerCompanyDtoConverter ownerCompanyDtoConverter;

    private final StockOwnerCompanyValidator companyValidator;

    private final UserService userService;

    private final AddressService addressService;

    @Autowired
    public StockOwnerCompanyServiceImpl(StockOwnerCompanyDao stockOwnerCompanyDao, UserService userService, OwnerCompanyDtoConverter ownerCompanyDtoConverter, StockOwnerCompanyValidator companyValidator, AddressService addressService) {
        this.stockOwnerCompanyDao = stockOwnerCompanyDao;
        this.userService = userService;
        this.ownerCompanyDtoConverter = ownerCompanyDtoConverter;
        this.companyValidator = companyValidator;
        this.addressService = addressService;
    }


    @Override
    @Transactional(readOnly = true)
    public OwnerCompanyDto getClientDtoForOwnerCompany(String nameCompany) {
        StockOwnerCompany clientCompany =
                stockOwnerCompanyDao.findByName(nameCompany).orElseThrow(DataNotFoundError::new);
        logger.debug("getClientDtoForOwnerCompany({}): {}", nameCompany, clientCompany);
        return ownerCompanyDtoConverter.toClientDto(clientCompany);
    }

    @Override
    @Transactional
    public StockOwnerCompany saveStockOwnerCompany(StockOwnerCompany stockOwnerCompany) {
        stockOwnerCompany.setId(null);
        logger.debug("saveStockOwnerCompany({})", stockOwnerCompany);
        validationFields(stockOwnerCompany);

        User admin = setAdminRole(stockOwnerCompany);
        stockOwnerCompany.setAdmin(userService.save(admin));
        stockOwnerCompany.setAddress(addressService.save(stockOwnerCompany.getAddress()));

        return stockOwnerCompanyDao.save(stockOwnerCompany);
    }

    private User setAdminRole(StockOwnerCompany stockOwnerCompany) {
        User admin = stockOwnerCompany.getAdmin();
        Role role = new Role();
        role.setName("ADMIN");
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        admin.setRoles(roles);
        return admin;
    }

    private void validationFields(StockOwnerCompany stockOwnerCompany) {
        Map<String, String> errors = companyValidator.checkNewOwnerCompany(stockOwnerCompany);
        if (errors.size() > 0){
            throw new ValidationError(errors);
        }
    }

    @Override
    @Transactional
    public StockOwnerCompany updateStockOwnerCompany(StockOwnerCompany stockOwnerCompany) {
        validationFields(stockOwnerCompany);

        StockOwnerCompany companyInDB =
                stockOwnerCompanyDao.findOne(stockOwnerCompany.getId());
        if (companyInDB == null){
            throw new DataNotFoundError("StockOwnerCompany with id: " + stockOwnerCompany.getId());
        }
        logger.debug("updateStockOwnerCompany: \n{} -> \n{}", companyInDB, stockOwnerCompany);
        updateData(stockOwnerCompany, companyInDB);

        return companyInDB;
    }

    private void updateData(StockOwnerCompany stockOwnerCompany, StockOwnerCompany companyInDB) {
        companyInDB.setName(stockOwnerCompany.getName());
        stockOwnerCompany.getAdmin().setId(companyInDB.getAdmin().getId());

        companyInDB.setAdmin(userService.update(stockOwnerCompany.getAdmin()));
        stockOwnerCompany.getAddress().setId(companyInDB.getAddress().getId());
        companyInDB.setAddress(addressService.update(stockOwnerCompany.getAddress()));
    }
}
