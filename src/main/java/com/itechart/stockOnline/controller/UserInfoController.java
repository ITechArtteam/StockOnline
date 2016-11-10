package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.dto.UserInfo;
import com.itechart.stockOnline.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/userinfo")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @RequestMapping(value = "/{username}")
    @ResponseBody
    public UserInfo loadUserInfo(@PathVariable String username) {
        return userInfoService.getUserInfo(username);
    }
}
