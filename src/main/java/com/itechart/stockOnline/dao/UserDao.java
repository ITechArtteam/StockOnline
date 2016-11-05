package com.itechart.stockOnline.dao;


import com.itechart.stockOnline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {
    User findByName(String username);
}
