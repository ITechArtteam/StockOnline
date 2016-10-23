package com.itechart.controllers;

import com.itechart.domain.User;
import com.itechart.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloWorldController {

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/login")
    public @ResponseBody String hello() {
        User user = new User();
        user.setPassword("23465732");
        user.setFirstName("23456754321456");
        userService.save(user);
        System.out.println(user);
        return "ok";
    }

}


