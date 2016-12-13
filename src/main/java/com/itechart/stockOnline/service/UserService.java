package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;

import java.util.Set;

public interface UserService {

    User save(User user);
    User update(User user);
    User findByCompany(StockOwnerCompany company);
    Set<User> findAllByStockOwnerCompany(StockOwnerCompany stockOwnerCompany);
    User findByLogin(String login);

    void delete(User user);
}
