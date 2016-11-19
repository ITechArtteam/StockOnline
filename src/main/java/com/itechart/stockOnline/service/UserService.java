package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.User;

public interface UserService {

    User save(User user);
    User update(User user);

    User findByLogin(String login);
}
