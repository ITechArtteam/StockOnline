package com.itechart.controllers;

import com.itechart.domain.User;
import com.itechart.services.SecurityService;
import com.itechart.services.UserService;
import com.itechart.validators.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public BindingResult hello(BindingResult bindingResult) {
        User user = new User();
        user.setFirstName("di");
        userValidator.validate(user, bindingResult);
        return bindingResult;
    }

}


