package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerRepository extends JpaRepository<User, Long>{
}
