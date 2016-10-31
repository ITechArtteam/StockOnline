package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.service.SecurityService;
import com.itechart.stockOnline.service.UserService;
import com.itechart.stockOnline.validator.UserValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @RequestMapping(value="/")
    public String reactLogin() {
        return "index";
    }
}