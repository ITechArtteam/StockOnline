package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;

public interface UserService {

    User save(User user);
    User update(User user);
    User findByCompany(StockOwnerCompany company);
    User findByLogin(String login);

    void delete(User user);
}
