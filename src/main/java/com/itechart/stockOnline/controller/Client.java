package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.dao.AddressDao;
import com.itechart.stockOnline.dao.ClientDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.ClientCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.ClientDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/customer")
public class Client {

    private static final Logger logger = LoggerFactory.getLogger(Client.class);


    @Autowired
    private ClientDao clientDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private AddressDao addressDao;

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public ClientDto getClientData(@PathVariable String name){
        ClientCompany clientCompany = clientDao.findByName(name).orElseThrow(DataNotFoundError::new);
        ClientDto client = new ClientDto();
        client.setCountry(clientCompany.getAddress().getCountryName());
        client.setCity(clientCompany.getAddress().getCityName());
        client.setStreet(clientCompany.getAddress().getStreet());
        client.setBossLogin(clientCompany.getBoss().getUsername());
        client.setAdminLogin(clientCompany.getAdmin().getUsername());
        client.setname(clientCompany.getName());
        return client;
    }

    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    public String addClient(@RequestBody ClientDto client){
        logger.debug("REST request. Path:/customer/  method: POST Request body {}", client);
        ClientCompany company = new ClientCompany();
        User boss = new User();
        boss.setUsername(client.getBossLogin());
        boss.setPassword(client.getBossPassword());
        boss = userDao.save(boss);
        User admin = new User();
        admin.setUsername(client.getAdminLogin());
        admin.setPassword(client.getAdminPassword());
        admin = userDao.save(admin);
        Address address = new Address();
        address.setCountryName(client.getCountry());
        address.setCityName(client.getCity());
        address.setStreet(client.getStreet());
        address = addressDao.save(address);
        company.setName(client.getname());
        company.setBoss(boss);
        company.setAdmin(admin);
        company.setAddress(address);
        clientDao.save(company);
        return "Ok";
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> dataNotFound(){
        return new ResponseEntity<>(
                "Данных нет", new HttpHeaders(), HttpStatus.NOT_FOUND);
    }

}
