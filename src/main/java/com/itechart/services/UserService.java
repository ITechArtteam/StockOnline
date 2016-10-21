package com.itechart.services;

import com.itechart.domain.User;

public interface UserService {

    void save(User user);

    User findByUsername(String username);
}
