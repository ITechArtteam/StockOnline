package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.converter.OwnerCompanyDtoConverter;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.service.StockOwnerCompanyService;
import com.itechart.stockOnline.service.UserService;
import com.itechart.stockOnline.util.ControllerHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(value = "/customer")
public class StockOwnerCompanyController {

    private static final Logger logger = LoggerFactory.getLogger(StockOwnerCompanyController.class);

    private final OwnerCompanyDtoConverter ownerCompanyDtoConverter;

    private final StockOwnerCompanyService companyService;

    private final UserService userService;

    @Autowired
    public StockOwnerCompanyController(StockOwnerCompanyService companyService, OwnerCompanyDtoConverter ownerCompanyDtoConverter, UserService userService) {
        this.companyService = companyService;
        this.ownerCompanyDtoConverter = ownerCompanyDtoConverter;
        this.userService = userService;
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public OwnerCompanyDto getClientData(@PathVariable String name){
        logger.debug("REST request. Path:/customer/{}  method: GET", name);
        name = ControllerHelper.convertToUtf(name);
        return companyService.getClientDtoForOwnerCompany(name);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> addClient(@RequestBody OwnerCompanyDto client){
        logger.debug("REST request. Path:/customer/  method: POST Request body {}", client);
        StockOwnerCompany stockOwnerCompany = ownerCompanyDtoConverter.toStockOwnerCompany(client);
        User admin = ownerCompanyDtoConverter.toUser(client);
        if (stockOwnerCompany.getId() > -1){
            stockOwnerCompany = companyService.update(stockOwnerCompany);

            User userInDB = userService.findByCompany(stockOwnerCompany);
            admin.setId(userInDB.getId());
            admin.setStockOwnerCompany(stockOwnerCompany);
            userService.update(admin);
        } else {
            stockOwnerCompany.setActive(true);
            stockOwnerCompany = companyService.saveStockOwnerCompany(stockOwnerCompany);
            admin = setAdminRole(admin);
            admin.setStockOwnerCompany(stockOwnerCompany);
            userService.save(admin);
        }
        return new ResponseEntity<>(stockOwnerCompany.getId(), new HttpHeaders(), HttpStatus.OK);
    }

    private User setAdminRole(User admin) {
        Role role = new Role();
        role.setName("ADMIN");
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        admin.setRoles(roles);
        return admin;
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> dataNotFound(DataNotFoundError error){
        logger.error("dataNotFound({})", error.getMessage());
        return new ResponseEntity<>(
                error.getMessage() , new HttpHeaders(), HttpStatus.NOT_FOUND);
    }


}
