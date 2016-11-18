package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserInfoService {

    @Autowired
    private UserService userService;

    @Transactional(readOnly = true)
    public UserInfo getUserInfo(String username) {
        User user = userService.findByName(username);

        Set<String> userRolesStrings = new HashSet<>();
        for (Role role : user.getRoles()) {
            userRolesStrings.add(role.getName());
        }

        return new UserInfo(user.getName(), userRolesStrings);
    }
}
