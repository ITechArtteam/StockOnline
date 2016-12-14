package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface UserDao extends JpaRepository<User, Long> {

    User findByStockOwnerCompany(StockOwnerCompany stockOwnerCompany);
    Optional<User> findByEmail(String email);
    Optional<User> findByLogin(String login);
    Set<User> findAllByStockOwnerCompany(StockOwnerCompany stockOwnerCompany);
}
