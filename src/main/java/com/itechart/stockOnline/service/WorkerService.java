package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.User;

import java.util.List;

public interface WorkerService {
    List<User> getAll();
    User get(int id);
    User save(User user);
    void delete(int id);
    void delete(User[] workers);
}
