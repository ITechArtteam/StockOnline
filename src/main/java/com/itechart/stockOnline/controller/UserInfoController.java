package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.dto.UserInfo;
import com.itechart.stockOnline.service.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/userinfo")
public class UserInfoController {

    private static final Logger logger = LoggerFactory.getLogger(UserInfoController.class);

    @Autowired
    private UserInfoService userInfoService;

    @RequestMapping(value = "/{login}")
    @ResponseBody
    public UserInfo loadUserInfo(@PathVariable String login) {
        logger.debug("loadUserInfo({})", login);
        UserInfo userInfo = userInfoService.getUserInfo(login);
        logger.debug("user:{} got roles: {}", userInfo.getUsername(), userInfo.getRoles());
        return userInfo;
    }
}
