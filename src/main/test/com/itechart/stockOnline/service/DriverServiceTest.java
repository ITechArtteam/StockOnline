package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Driver;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:appconfig-root.xml")
@Transactional
public class DriverServiceTest {

    @Autowired
    DriverService driverService;

    @Test
    public void save() {

    }

    @Test
    public void update() {

    }

    @Test
    public void findByPassportNumber() {
        Driver driver = driverService.findByPassportNumber("BM1234567");
        Assert.assertNotNull(driver);
    }

    @Test
    public void delete() {

    }

}