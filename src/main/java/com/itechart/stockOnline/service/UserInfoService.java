package com.itechart.stockOnline.service;

import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserInfoService {

    @Autowired
    private UserService userService;

    @Transactional(readOnly = true)
    public UserInfo getUserInfo(String login) {
        User user = userService.findByLogin(login);

        if (user.getStockOwnerCompany() != null && !user.getStockOwnerCompany().getActive()) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            auth.setAuthenticated(false);

            Map<String, String> error = new HashMap<>();
            error.put("auth", "Компания заблокированна");
            throw new ValidationError(error);
        }

        return convertUserToUserInfo(user);
    }

    private UserInfo convertUserToUserInfo(User user) {
        Set<String> userRolesStrings = new HashSet<>();
        for (Role role : user.getRoles()) {
            userRolesStrings.add(role.getName());
        }
        Long idCompany = Optional.ofNullable(user.getStockOwnerCompany()).map(StockOwnerCompany::getId).orElse(null);
        return new UserInfo(user.getId(), user.getLogin(), userRolesStrings, idCompany );
    }
}
