package com.itechart.stockOnline.dao;


import com.itechart.stockOnline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {
    User findByName(String username);

    Optional<User> findByEmail(String email);
    Optional<User> findByLogin(String login);
}
