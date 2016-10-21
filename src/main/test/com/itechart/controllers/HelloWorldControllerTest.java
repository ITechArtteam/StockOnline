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

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootConfig.class, RepositoryConfig.class})
@WebAppConfiguration
public class HelloWorldControllerTest {

    @Autowired
    UserService userService;

    @Test
    public void run() {

        User user = new User();
        user.setFirstName("dima");
        user.setPassword("123");
        userService.save(user);
    }
}