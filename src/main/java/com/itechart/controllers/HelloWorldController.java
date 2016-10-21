package com.itechart.controllers;

import com.itechart.domain.User;
import com.itechart.services.SecurityService;
import com.itechart.services.UserService;
import com.itechart.validators.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloWorldController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @RequestMapping(value = "/login")
    public String hello() {
        User user = new User();
        user.setFirstName("dima");
        user.setPassword("123");
        user.setConfirmPassword("123");
        userService.save(user);
        return "ok";
    }

}


