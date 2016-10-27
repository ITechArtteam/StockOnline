package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.User;

public interface UserService {

    void save(User user);

    User findByUsername(String username);
}
