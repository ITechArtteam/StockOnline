package com.itechart.controllers;

import com.itechart.config.RepositoryConfig;
import com.itechart.config.RootConfig;
import com.itechart.domain.User;
import com.itechart.services.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootConfig.class, RepositoryConfig.class})
@WebAppConfiguration
public class HelloWorldControllerTest {

    @Autowired
    UserService userService;

    @Test
    @Transactional
    public void run() {

        User user = userService.findByUsername("dima");
        System.out.println(user);

        user = userService.findByUsername("Roma");
        System.out.println(user);

        user = new User();
        user.setPassword("23465732");
        user.setFirstName("23456754321456");
        userService.save(user);

    }
}