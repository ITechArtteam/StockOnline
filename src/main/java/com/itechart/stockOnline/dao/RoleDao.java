package com.itechart.stockOnline.dao;


import com.itechart.stockOnline.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, Long> {
}
