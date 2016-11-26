package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:appconfig-root.xml")
@Transactional
public class StockOwnerCompanyServiceImplTest {

    @Autowired
    private StockOwnerCompanyDao stockOwnerCompanyDao;

    @Autowired
    private StockOwnerCompanyService stockOwnerCompanyService;

    @Autowired
    private UserService userService;

    private StockOwnerCompany getDefault(){
        StockOwnerCompany company = new StockOwnerCompany();
        company.setName("TestName");
        company.setAddress(new Address());
        return company;
    }

    @Test
    public void save(){
        StockOwnerCompany company = getDefault();
        stockOwnerCompanyService.saveStockOwnerCompany(company);
        StockOwnerCompany companyInDB = stockOwnerCompanyDao.findByName("TestName").orElseThrow(DataNotFoundError::new);

        assertNotNull(companyInDB.getAddress());
        assertEquals(companyInDB.getName(), companyInDB.getName());

    }

    @Test
    public void deleteByNames() {
        StockOwnerCompany company = getDefault();
        company = stockOwnerCompanyService.saveStockOwnerCompany(company);
        Set<String> companies = new HashSet<>();
        companies.add("TestName");
        User user = getDefaultUser();
        user.setStockOwnerCompany(company);
        userService.save(user);

        assertEquals(1, stockOwnerCompanyDao.deleteByNameIn(companies));
        System.out.println(stockOwnerCompanyDao.findByName("TestName"));
    }

    private User getDefaultUser(){

        User user = new User();
        user.setPassword("111");
        user.setLogin("TestLogin");
        user.setEmail("test@email.com");
        Set<Role> role = new HashSet<>();
        role.add(new Role("ADMIN"));
        user.setRoles(role);
        user.setAddress(new Address());

        return user;
    }

}