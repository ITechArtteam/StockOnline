package com.itechart;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @RequestMapping(value = "/index")
    public String hello() {
        return "hello";
    }

}


