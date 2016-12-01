package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.User;

import java.util.List;

public interface WorkerService {
    List<User> getAll();
    User get(Long id);
    User save(User worker);
    void delete(Long id);
    void delete(Long... ids);
    void delete(User[] workers);
}
