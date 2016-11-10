package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.model.dto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserInfoService {

    @Autowired
    private UserDao userDao;

    public UserInfo getUserInfo(String username) {
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");
        return new UserInfo("user", roles);
    }
}
