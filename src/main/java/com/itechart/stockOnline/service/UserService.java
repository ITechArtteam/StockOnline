package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.User;

public interface UserService {

    void save(User user);

    User findByName(String name);

    User findByLogin(String login);
}
