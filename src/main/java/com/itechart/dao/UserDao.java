package com.itechart.dao;

import com.itechart.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDao extends CrudRepository<User, Long> {
    User findByFirstName(String username);
}
