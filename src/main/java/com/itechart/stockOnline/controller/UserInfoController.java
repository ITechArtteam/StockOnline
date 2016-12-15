package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.dto.UserInfo;
import com.itechart.stockOnline.service.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/userinfo")
public class UserInfoController {

    private static final Logger logger = LoggerFactory.getLogger(UserInfoController.class);

    @Autowired
    private UserInfoService userInfoService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{login}")
    @ResponseBody
    public UserInfo loadUserInfo(@PathVariable String login) {
        logger.debug("loadUserInfo({})", login);
        UserInfo userInfo = userInfoService.getUserInfo(login);
        logger.debug("user:{} got roles: {}", userInfo.getUsername(), userInfo.getRoles());
        return userInfo;
    }

    @ExceptionHandler(value = ValidationError.class)
    public ResponseEntity<Object> fieldHasErrors(ValidationError error){
        logger.error("fieldHasErrors({})", error.toString());
        return new ResponseEntity<>(
                error.getErrors(), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


}
