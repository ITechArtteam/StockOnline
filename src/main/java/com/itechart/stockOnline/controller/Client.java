package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/client/{name}")
public class Client {

    @RequestMapping(method = RequestMethod.GET)
    public User getClientData(@PathVariable String name){
        System.out.println(name);
        User user = new User();
        user.setUsername(name);
        user.setPassword("1243");
        return user;
    }
}
