package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.dao.AddressDao;
import com.itechart.stockOnline.dao.ClientDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.ClientCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.validator.ClientValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/customer")
public class Client {

    @Autowired
    private ClientDao clientDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private AddressDao addressDao;

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public User getClientData(@PathVariable String name){
        System.out.println(name);
        User user = new User();
        user.setUsername(name);
        user.setPassword("1243");
        return user;
    }

    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    public String addClient(@RequestBody ClientValidator client){
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

}
