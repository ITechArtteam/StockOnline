package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.StockOwnerCompany;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:appconfig-root.xml")
@Transactional
public class StockOwnerCompanyServiceImplTest {

    @Autowired
    private StockOwnerCompanyService stockOwnerCompanyService;

    @Test
    public void getClientDtoForOwnerCompany() {
        StockOwnerCompany stockOwnerCompany = new StockOwnerCompany();
        stockOwnerCompany.setAddress(new Address());
        stockOwnerCompany.setName("TestName");
        System.out.println(stockOwnerCompanyService.saveStockOwnerCompany(stockOwnerCompany));
    }

    @Test
    public void saveStockOwnerCompany() {

    }

    @Test
    public void update() {

    }

    @Test
    public void getStockOwnersPage() {

    }

    @Test
    public void deleteByNames() {

    }

}